/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
var isDefined = customElements.get('localization-form');

if (!isDefined) {
  class LocalizationForm extends HTMLElement {
    constructor() {
      super();

      this.thing = 0;

      this.elements = {
        input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
        button: this.querySelector('button'),
        panel: this.querySelector('ul'),
      };

      this.elements.button.addEventListener('click', this.openSelector.bind(this));
      this.elements.button.addEventListener('focusout', this.closeSelector.bind(this));
      this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

      this.querySelectorAll('a').forEach(item => item.addEventListener('click', this.onItemClick.bind(this)));
    }


    hidePanel() {
      this.elements.button.setAttribute('aria-expanded', 'false');
      this.elements.panel.setAttribute('hidden', true);
    }

    onContainerKeyUp(event) {
      if (event.code.toUpperCase() !== 'ESCAPE') return;

      this.hidePanel();
      this.elements.button.focus();
    }

    onItemClick(event) {
      event.preventDefault();
      const form = this.querySelector('form');
      this.elements.input.value = event.currentTarget.dataset.value;
      if (form) form.submit();
    }

    openSelector() {
      this.elements.button.focus();
      this.elements.panel.toggleAttribute('hidden');
      this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());
      this.setPanelOffset();
    }

    closeSelector(event) {
      const shouldClose = event.relatedTarget && event.relatedTarget.nodeName === 'BUTTON';
      if (event.relatedTarget === null || shouldClose) {
        this.hidePanel();
      }
    }

    setPanelOffset() {
      // Sets the 'top' value of the panel so that it sits flush against a container element (data-selector="localization-form-offset-container")
      const offsetContainer = this.elements.panel.closest('[data-selector="localization-form-offset-container"]');
      if (!offsetContainer) return;
      const panelOffset = offsetContainer.getBoundingClientRect().bottom - this.elements.button.getBoundingClientRect().bottom + this.elements.button.getBoundingClientRect().height;
      this.elements.panel.style.top = `${panelOffset}px`;
    }
  }

  customElements.define('localization-form', LocalizationForm);
}

/******/ })()
;