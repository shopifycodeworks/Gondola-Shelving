class SafeLoadScripts extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'none'; // do not break dom slots
  }


  connectedCallback() {
    const scripts = this.querySelectorAll('safe-load-scripts > script');

    scripts.forEach((script) => {
      const key = script.dataset.envyLoadKey;

      const scriptLoaded = window.wetheme.webcomponentRegistry.checkScriptLoaded(key);
      if(!scriptLoaded) {
        const postLoadedScript = document.createElement('script');
        const {src, defer, async, type} = script;
        postLoadedScript.src = src;
        postLoadedScript.defer = defer;
        postLoadedScript.async = async;
        postLoadedScript.type = type;
            

        this.appendChild(postLoadedScript);

      }
    })
        
  }
}

customElements.define('safe-load-scripts', SafeLoadScripts);
