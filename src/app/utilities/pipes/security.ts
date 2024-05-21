import { Pipe } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtml {

    constructor(private domSanitizer: DomSanitizer) { }

    transform(url): SafeResourceUrl {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }

}



