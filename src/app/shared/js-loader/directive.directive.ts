import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appJsLoader]'
})
export class DirectiveDirective implements OnInit{

  constructor() { }

  @Input('script') param: any;

  ngOnInit() {
    this.loadScript(this.param);
  }

  public loadScript(url: string) {
    const body = document.body as HTMLDivElement;

    const loadedScript = document.querySelector('script[src="' + url + '"]');
    if (loadedScript){
      loadedScript.parentElement.removeChild(loadedScript);
    }

    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
