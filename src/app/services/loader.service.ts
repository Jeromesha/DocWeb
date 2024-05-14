import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private isLoading: boolean = false;

    show(): void {
        this.isLoading = true;
        this.loadGif();
        this.getLoadingState();
    }

    hide(): void {
        this.isLoading = false;
        this.loadGif();
        this.getLoadingState();
    }

    loadGif() {
        if (JSON.parse(localStorage.getItem('isLoggedin')) === true) {
            return false;
        } else {
            return true;
        }
    }

    getLoadingState(): boolean {
        return this.isLoading;
    }
}
