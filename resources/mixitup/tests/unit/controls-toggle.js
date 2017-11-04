'use strict';

require('jsdom-global')();

const chai    = require('chai');
const dom     = require('../mock/dom');
const mixitup = require('../../dist/mixitup.js');

chai.use(require('chai-shallow-deep-equal'));
chai.use(require('chai-as-promised'));

describe('Controls', () => {
    describe('Toggle', () => {
        describe('OR', () => {
            let frag = document.createDocumentFragment();
            let container = dom.getContainer();
            let controls = dom.getFilterControls();

            container.insertBefore(controls, container.children[0]);

            frag.appendChild(container);

            let mixer = mixitup(container, {
                controls: {
                    scope: 'local'
                }
            });

            after(() => mixer.destroy());

            it('should accept toggle controls with a selector value', () => {
                return mixer.hide()
                    .then(() => {
                        let toggle = controls.querySelector('[data-toggle=".category-a"]');

                        let totalMatching = container.querySelectorAll('.category-a').length;

                        toggle.click();

                        let state = mixer.getState();

                        chai.assert.equal(state.activeFilter.selector, '.category-a');
                        chai.assert.equal(state.totalShow, totalMatching);
                        chai.assert.isOk(toggle.matches('.mixitup-control-active'));
                    });
            });

            it('should build up a compound selector as toggles are activated', () => {
                let toggleA = controls.querySelector('[data-toggle=".category-a"]');
                let toggleB = controls.querySelector('[data-toggle=".category-b"]');

                let totalMatching = container.querySelectorAll('.category-a, .category-b').length;

                toggleB.click();

                let state = mixer.getState();

                chai.assert.equal(state.activeFilter.selector, '.category-a, .category-b');
                chai.assert.equal(state.totalShow, totalMatching);
                chai.assert.isOk(toggleA.matches('.mixitup-control-active'));
                chai.assert.isOk(toggleB.matches('.mixitup-control-active'));
            });

            it('should break down a compound selector as toggles are deactivated', () => {
                let toggle = controls.querySelector('[data-toggle=".category-a"]');

                let totalMatching = container.querySelectorAll('.category-b').length;

                toggle.click();

                let state = mixer.getState();

                chai.assert.equal(state.activeFilter.selector, '.category-b');
                chai.assert.equal(state.totalShow, totalMatching);
                chai.assert.isNotOk(toggle.matches('.mixitup-control-active'));
            });

            it('should return to "all" when all toggles are deactivated', () => {
                let toggle = controls.querySelector('[data-toggle=".category-b"]');

                toggle.click();

                let state = mixer.getState();

                chai.assert.equal(state.activeFilter.selector, '.mix');
                chai.assert.equal(state.totalHide, 0);
                chai.assert.isNotOk(toggle.matches('.mixitup-control-active'));
            });
        });

        describe('AND', () => {
            let frag = document.createDocumentFragment();
            let container = dom.getContainer();
            let controls = dom.getFilterControls();

            container.insertBefore(controls, container.children[0]);

            frag.appendChild(container);

            let mixer = mixitup(container, {
                controls: {
                    scope: 'local',
                    toggleLogic: 'AND'
                }
            });

            after(() => mixer.destroy());

            it('should accept toggle controls with a selector value', () => {
                return mixer.hide()
                    .then(() => {
                        let toggle = controls.querySelector('[data-toggle=".category-a"]');

                        let totalMatching = container.querySelectorAll('.category-a').length;

                        toggle.click();

                        let state = mixer.getState();

                        chai.assert.equal(state.activeFilter.selector, '.category-a');
                        chai.assert.equal(state.totalShow, totalMatching);
                        chai.assert.isOk(toggle.matches('.mixitup-control-active'));
                    });
            });

            it('should build up a compound selector as toggles are activated', () => {
                let toggleA = controls.querySelector('[data-toggle=".category-a"]');
                let toggleB = controls.querySelector('[data-toggle=".category-c"]');

                let totalMatching = container.querySelectorAll('.category-a.category-c').length;

                toggleB.click();

                let state = mixer.getState();

                chai.assert.equal(state.activeFilter.selector, '.category-a.category-c');
                chai.assert.equal(state.totalShow, totalMatching);
                chai.assert.isOk(toggleA.matches('.mixitup-control-active'));
                chai.assert.isOk(toggleB.matches('.mixitup-control-active'));
            });

            it('should break down a compound selector as toggles are deactivated', () => {
                let toggle = controls.querySelector('[data-toggle=".category-a"]');

                let totalMatching = container.querySelectorAll('.category-c').length;

                toggle.click();

                let state = mixer.getState();

                chai.assert.equal(state.activeFilter.selector, '.category-c');
                chai.assert.equal(state.totalShow, totalMatching);
                chai.assert.isNotOk(toggle.matches('.mixitup-control-active'));
            });

            it('should return to "all" when all toggles are deactivated', () => {
                let toggle = controls.querySelector('[data-toggle=".category-c"]');

                toggle.click();

                let state = mixer.getState();

                chai.assert.equal(state.activeFilter.selector, '.mix');
                chai.assert.equal(state.totalHide, 0);
                chai.assert.isNotOk(toggle.matches('.mixitup-control-active'));
            });

            it('should allow toggles to activated via the API', () => {
                let totalMatching = container.querySelectorAll('.category-a.category-c').length;

                mixer.toggleOn('.category-a');
                mixer.toggleOn('.category-c');

                let state = mixer.getState();

                chai.assert.equal(state.activeFilter.selector, '.category-a.category-c');
                chai.assert.equal(state.totalShow, totalMatching);
            });
        });

        describe('Defaults', () => {
            it('should default to "none" when all toggles are deactivated and toggleDefault is set to "none"', () => {
                let frag = document.createDocumentFragment();
                let container = dom.getContainer();
                let controls = dom.getFilterControls();

                container.insertBefore(controls, container.children[0]);

                frag.appendChild(container);

                let mixer = mixitup(container, {
                    controls: {
                        scope: 'local',
                        toggleDefault: 'none'
                    }
                });

                return mixer.hide()
                    .then(() => {
                        let toggle = controls.querySelector('[data-toggle=".category-a"]');

                        // on
                        toggle.click();

                        // off
                        toggle.click();

                        let state = mixer.getState();

                        chai.assert.equal(state.activeFilter.selector, '');
                        chai.assert.equal(state.totalShow, 0);
                        chai.assert.isNotOk(toggle.matches('.mixitup-control-active'));

                        mixer.destroy();
                    });
            });

            it('should default to "all" when all toggles are deactivated', () => {
                let container = dom.getContainer();
                let controls = dom.getFilterControls();

                container.insertBefore(controls, container.children[0]);

                document.body.appendChild(container);

                let mixer = mixitup(container, {
                    controls: {
                        scope: 'local',
                        toggleDefault: 'all'
                    }
                });

                return mixer.hide()
                    .then(() => {
                        let toggle = controls.querySelector('[data-toggle=".category-a"]');

                        // on
                        toggle.click();

                        // off
                        toggle.click();

                        let state = mixer.getState();

                        chai.assert.equal(state.activeFilter.selector, '.mix');
                        chai.assert.equal(state.totalHide, 0);
                        chai.assert.isNotOk(toggle.matches('.mixitup-control-active'));
                    });
            });
        });
    });
});