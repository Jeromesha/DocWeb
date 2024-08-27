import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OwlOptions, SlidesOutputData } from "ngx-owl-carousel-o";

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
interface PackageService {
  name: string;
  description: string | null;
}
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: [
    // "../../../../assets/landing/lib/animate/animate.min.css",
    // "../../../../assets/landing/lib/owlcarousel/assets/owl.carousel.min.css",
    "../../../../assets/landing/css/bootstrap.min.css",
    "./register.component.scss",

  ],
  encapsulation: ViewEncapsulation.None // or ViewEncapsulation.Emulated

})
export class RegisterPageComponent implements OnInit {
  //public API_END_POINT_TRANSACTION: any = environment.apiBaseUrlTransaction;
  packages: any = [];
  collapseIndex: number;
  objectKeys = Object.keys;
  activeSlides?: SlidesOutputData;
  centerIndex: number = 0; // Initialize the center index
  serviceList: any = []
  testimonials = [
    { name: 'Test User', location: 'Chennai', text: 'Lorem ipsum dolor sit amet...' },
    { name: 'Vineesh', location: 'Chennai', text: 'Lorem ipsum dolor sit amet...' },
    { name: 'Rahul', location: 'Coimbatore', text: 'Lorem ipsum dolor sit amet...' }
  ];
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 6000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    center: true,
    navSpeed: 6000,
    nav: true,
    margin: 10,
    navText: ["", ""],
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 3,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  };
  form: FormGroup;
  constructor(

    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private _http: HttpClient,
    private formBuilder: FormBuilder,
  ) {
    this.getService()
  }

  ngOnInit(): void {
    this.initializeValidators();
    this.getPackage();
  }

  ngAfterViewInit(): void {
    this.loadScripts();
    this.initCounterUp();
  }
  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(?: [a-zA-Z]+)*$')]], // Only letters allowed
      position: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(?: [a-zA-Z]+)*$')]], // Only letters allowed
      email: ['', [Validators.required]], // Standard email validation
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Allows exactly 10 digits
      whatsappNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      stateId: ['', [Validators.required]],
      districtId: ['', [Validators.required]],
      companyName: [''],
      webUrl: [''],
      address: ['', Validators.required]
    });

  }

  validateFormControl() {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true,
        });
      }
    });
  }
  loadScripts(): void {
    this.loadScript("jquery", "../../../../assets/landing/js/jquery-3.4.1.min.js").then(() => {
      return this.loadScript("bootstrap", "../../../../assets/landing/js/bootstrap.bundle.min.js");
    }).then(() => {
      return this.loadScript("wow", "../../../../assets/landing/lib/wow/wow.min.js");
    }).then(() => {
      return this.loadScript("easing", "../../../../assets/landing/lib/easing/easing.min.js");
    }).then(() => {
      return this.loadScript("waypoints", "../../../../assets/landing/lib/waypoints/waypoints.min.js");
    }).then(() => {
      return this.loadScript("counterup", "../../../../assets/landing/lib/counterup/counterup.min.js");
    }).then(() => {
      return this.loadScript("owlcarousel", "../../../../assets/landing/lib/owlcarousel/owl.carousel.min.js");
    }).then(() => {
      return this.loadScript("main", "../../../../assets/landing/js/main.js");
    }).catch((error) => {
      console.error('Error loading scripts:', error);
    });
  }

  loadScript(name: string, url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = url;
      scriptElement.onload = () => {
        console.log(`${name} script loaded successfully.`);
        resolve();
      };
      scriptElement.onerror = () => {
        reject(`Error loading ${name} script.`);
      };
      document.head.appendChild(scriptElement);
    });
  }

  scrollToDiv() {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  }

  initCounterUp(): void {
    // const $element = $(this.elementRef.nativeElement) as any; // Declare $element as 'any'

    // $element.find('[data-toggle="counter-up"]').counterUp({
    //   delay: 10,
    //   time: 2000
    // });
  }


  IDPlogin(): void {
    debugger;
    // window.open(environment.redirectUrl, "_self");
    // console.log(environment.redirectUrl, "sfds");
  }

  home() {
    debugger;
    this.router.navigate(['/landingpage']);
  }
  password() {
    this.router.navigate(['/passwordinet']);

  }
  forgotpassword() {
    debugger
    this.router.navigate(['/forgotpasswordinet']);
  }
  getPackage() {
    // var headers = new HttpHeaders();
    // headers = new HttpHeaders();
    // this.dataService.setHeaderValue(headers);
    // if (localStorage.getItem('access_token')) {
    //   headers = headers.set('access_token', localStorage.getItem('access_token'));
    // }
    // if (localStorage.getItem('realm_name')) {
    //   headers = headers.set('realm_name', localStorage.getItem('realm_name'));
    // }
    // var option = {
    //   headers: headers,
    //   responseType: 'text',
    // };
    // var url = this.API_END_POINT_TRANSACTION + 'api/Package/Package';
    // let payload = {

    // }
    // var resp = this.dataService.notokengetCall(url, option).subscribe(
    //   res => {
    //     var res1: any = JSON.stringify(res);
    //     res1 = JSON.parse(res1);
    //     res1 = JSON.parse(res1);
    //     res1.forEach(element => {
    //       element.expanded = false;
    //       element.isSelected = false;
    //     });
    //     this.packages = res1;
    //   },
    //   err => {
    //     console.log(err);
    //   });

  }
  getService() {
    // var headers = new HttpHeaders();
    // headers = new HttpHeaders();
    // this.dataService.setHeaderValue(headers);
    // if (localStorage.getItem('access_token')) {
    //   headers = headers.set('access_token', localStorage.getItem('access_token'));
    // }
    // if (localStorage.getItem('realm_name')) {
    //   headers = headers.set('realm_name', localStorage.getItem('realm_name'));
    // }
    // var option = {
    //   headers: headers,
    //   responseType: 'text',
    // };
    // var url = this.API_END_POINT_TRANSACTION + 'api/Package/Service/' + 0;
    // let payload = {

    // }
    // var resp = this.dataService.notokengetCall(url, option).subscribe(
    //   res => {
    //     var res1: any = JSON.stringify(res);
    //     res1 = JSON.parse(res1);
    //     res1 = JSON.parse(res1);
    //     this.serviceList = res1;
    //   },
    //   err => {
    //     console.log(err);
    //   });

  }


  getPackageServiceKeys(packageServices: { [key: string]: PackageService[] }): string[] {
    return Object.keys(packageServices);
  }

  hasPackageServices(packageServices: { [key: string]: PackageService[] }): boolean {
    return Object.keys(packageServices).length > 0;
  }
  btnShowServiceList(index) {
    this.collapseIndex = index;
  }
  btnSelectedPkg(pkg) {
    if (!pkg.isAllPackage) {
      pkg.isSelected = !pkg.isSelected;
    } else {
      let localData = this.packages;
      this.packages.forEach(element => {
        if (pkg.isAllPackage == element.isAllPackage) {
          element.isSelected = true;
        } else {
          element.isSelected = !element.isSelected;
        }
      });
      this.packages = localData;
    }
  }
  btnPageNavigation(url) {
    if (url != '')
      this.router.navigateByUrl(url);
  }
  getPassedData(data: SlidesOutputData): void {
    // Handle initialization data if needed
    console.log("Carousel initialized:", data);
  }
  onSlideChange(event: any): void {
    if (event && event.startPosition !== undefined) {
      // Assuming startPosition is 0-based index
      if (event.startPosition === 0) {
        this.centerIndex = 1; // Second place
      } else if (event.startPosition === 1) {
        this.centerIndex = 2; // Second place
      } else if (event.startPosition === 2) {
        this.centerIndex = 3; // Second place
      } else if (event.startPosition === 3) {
        this.centerIndex = 4; // First place
      } else if (event.startPosition === 4) {
        this.centerIndex = 0; // First place
      } else {
        // Handle other positions accordingly
        // For example, if you have more than 2 places
        // this.centerIndex = event.startPosition + 1;
      }
    }
  }

  onsubmit() {
    if (this.form.valid) {
      // var headers = new HttpHeaders();

      // var option = {
      //   headers: headers,
      //   responseType: "text",
      // };
      // var url = this.API_END_POINT_TRANSACTION + "api/Enquiry/Save";
      // let payload = this.form.value;
      // var resp = this.dataService.notokenpostCall(url, payload, option).subscribe(
      //   (res) => {
      //     var res1: any = JSON.stringify(res);
      //     res1 = JSON.parse(res1);
      //     res1 = JSON.parse(res1);
      //     if (res1["isSuccess"]) {
      //       this.alertService.success("Request has been sent");
      //       this.initializeValidators();
      //     } else {
      //       this.alertService.error(res1["message"])
      //     }

      //   },
      //   (err) => {
      //    // this.alertService.error("")
      //   }
      // );

    }
    else {
      this.validateFormControl()
    }
  }
}
