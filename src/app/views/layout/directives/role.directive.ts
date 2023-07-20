import { OnInit, Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { UserSessionService } from 'src/app/services/usersession.service';

// tslint:disable-next-line: directive-selector
@Directive({ selector: '[roleControl]' })
export class RoleDirective implements OnInit {

    @Input() roleControl: string;
    @Input() controlName: string;
    @Input() pageName: string;
    
    constructor(
        private elem: ElementRef,
        private renderer: Renderer2,
        private userSession: UserSessionService) { }

    ngOnInit() {
        this.renderer.setStyle(this.elem.nativeElement, 'display', 'none');
        const sessionValue = this.userSession.getLocalStorageWithKey('menu');
        if (sessionValue) {
            const roleData = JSON.parse(sessionValue);
            if (roleData) {
                for (let i = 0; i < roleData.length; i++) {
                    const result = this.checkPageRolePermission(roleData[i]);
                    if (result) {
                        return;
                    }
                }
            }
        }
    }

    checkPageRolePermission(page: any): Boolean {
        if (page.label === this.pageName) {
            if (page.pageControls && page.pageControls.length > 0) {
                const pageControl = page.pageControls.filter(i => i.displayName === this.controlName);
                if (pageControl && pageControl.length > 0) {
                    this.renderer.setStyle(this.elem.nativeElement, 'display', 'initial');
                    return true;
                }
            }
        } else if (page.subItems && page.subItems.length > 0) {
            for (let i = 0; i < page.subItems.length; i++) {
                const result = this.checkPageRolePermission(page.subItems[i]);
                if (result) {
                    return true;
                }
            }
        }
        return false;
    }
}
