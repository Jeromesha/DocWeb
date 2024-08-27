import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
// import AOS from 'aos'; //AOS - 1

@Component({
  selector: "app-service",
  templateUrl: "./service.component.html",
  styleUrls: [
    "../../../../assets/landing/css/bootstrap.min.css",
    "./service.component.scss",
  ],

  encapsulation: ViewEncapsulation.None, // or ViewEncapsulation.Emulated
})
export class ServiceComponent implements OnInit {
  arrayList: any = [
    {
      "id": 10,
      "link": "/move-to-bank",
      "label": "MOVE TO BANK",
      "icon": "movetobank.png",
      "isVisible": true
    }
  ]
  @ViewChildren('cards') cards: QueryList<any>;

  basicarrayList1: any = [
    {
      "id": 2,
      "link": "/billpayment",
      "label": "BILL PAYMENT",
      "icon": "bbps_icon.png",
      "isVisible": true
    },
    {
      "id": 11,
      "link": "/lic-prem",
      "label": "LIC PREMIUM",
      "icon": "LIC PREMIUM.svg",
      "isVisible": true
    },
    {
      "id": 8,
      "link": "/astro/astro-horoscope",
      "label": "ASTROLOGY",
      "icon": "ASTROLOGY.svg",
      "isVisible": true
    },
    {
      "id": 16,
      "link": "/product/Product-booking",
      "label": "PRODUCT SALE",
      "icon": "PRODUCT SALE.svg",
      "isVisible": true
    },
    {
      "id": 20,
      "link": "/rdentry",
      "label": "RD SERVICE",
      "icon": "RD SERVICE.svg",
      "isVisible": true
    },
    {
      "id": 14,
      "link": "/internal/anti_virus",
      "label": "ANTI VIRUS",
      "icon": "ANTI VIRUS.svg",
      "isVisible": true
    },
    {
      "id": 3,
      "link": "/recharge/mobile",
      "label": "RECHARGE",
      "icon": "RECHARGE.svg",
      "isVisible": true
    },
    {
      "id": 24,
      "link": "",
      "label": "INSURANCE",
      "icon": "OPTIMUM INSURANCE.svg",
      "isVisible": true
    },


  ]
  bankingarrayList1: any = [

    {
      "id": 7,
      "link": "/aeps/aeps-entries",
      "label": "AEPS",
      "icon": "aeps.svg",
      "isVisible": true
    },
    {
      "id": 21,
      "link": "/panNsdl/panNsdl",
      "label": "PAN NSDL",
      "icon": "Pan NSDL.svg",
      "isVisible": true
    },
    {
      "id": 5,
      "link": "/gstregistration",
      "label": "PAN UTIITSL",
      "icon": "PAN UTIITSL.svg",
      "isVisible": true
    },

    {
      "id": 6,
      "link": "/imt/money-transfer",
      "label": "MONEY TRANSFER",
      "icon": "Money Transfer.svg",
      "isVisible": true
    },
    {
      "id": 19,
      "link": "/mATM/OnBoard",
      "label": "mATM",
      "icon": "mATM.svg",
      "isVisible": true
    },


  ]
  travellist: any = [
    {
      "id": 1,
      "link": "/busbooking",
      "label": "BUS TICKET BOOKING",
      "icon": "Bus ticket booking.svg",
      "isVisible": true
    },
    {
      "id": 13,
      "link": "/passport/passport-entry",
      "label": "PASSPORT",
      "icon": "Passport.svg",
      "isVisible": true
    },
    {
      "id": 23,
      "link": "/digitalSignature/digitalSignature-booking",
      "label": "DIGITAL SIGNATURE",
      "icon": "Digital Signature.svg",
      "isVisible": true
    },

  ]
  travelirctcList: any = [
    {
      "id": 13,
      "link": "/passport/passport-entry",
      "label": "IRCTC",
      "icon": "Irctc.svg",
      "isVisible": true
    }]
  taxationList: any = [

    {
      "id": 4,
      "link": "/gstregistration",
      "label": "GST REGISTRATION",
      "icon": "GST-Registration.svg",
      "isVisible": true
    },
    {
      "id": 9,
      "link": "/gstfiling/gstfiling-gstfiling",
      "label": "GST FILING",
      "icon": "GST-Return-filling.svg",
      "isVisible": true
    },
    {
      "id": 12,
      "link": "/gstcancellation",
      "label": "GST CANCELLATION",
      "icon": "GST-Surrender.svg",
      "isVisible": true
    },
    {
      "id": 15,
      "link": "/gstamendment",
      "label": "GST AMENDMENT",
      "icon": "GST-Amendment.svg",
      "isVisible": true
    },
    {
      "id": 18,
      "link": "/gstlead",
      "label": "GST LEAD",
      "icon": "GST-Lead.svg",
      "isVisible": true
    },
    {
      "id": 17,
      "link": "/itfiling/itfiling",
      "label": "IT FILING",
      "icon": "ITfilling.png",
      "isVisible": true
    },

    {
      "id": 22,
      "link": "/itfiling/itfiling-itcompliance",
      "label": "IT NOTICE",
      "icon": "Notice Compliance.png",
      "isVisible": true
    },


  ]
  constructor(private router: Router, private elementRef: ElementRef) { }
  ngOnInit(): void {
    // AOS.init();//AOS - 2
    // AOS.refresh();
    this.loadScripts();
  }

  ngAfterViewInit(): void {
    this.initCounterUp();
    setTimeout(() => {
      this.cards.forEach(card => {
        card.nativeElement.classList.add('zoom-animation');
      });
    }, 100); // A
  }

  loadScripts(): void {
    this.loadScript(
      "jquery",
      "../../../../assets/landing/js/jquery-3.4.1.min.js"
    )
      .then(() => {
        return this.loadScript(
          "bootstrap",
          "../../../../assets/landing/js/bootstrap.bundle.min.js"
        );
      })
      .then(() => {
        return this.loadScript(
          "wow",
          "../../../../assets/landing/lib/wow/wow.min.js"
        );
      })
      .then(() => {
        return this.loadScript(
          "easing",
          "../../../../assets/landing/lib/easing/easing.min.js"
        );
      })
      .then(() => {
        return this.loadScript(
          "waypoints",
          "../../../../assets/landing/lib/waypoints/waypoints.min.js"
        );
      })
      .then(() => {
        return this.loadScript(
          "counterup",
          "../../../../assets/landing/lib/counterup/counterup.min.js"
        );
      })
      .then(() => {
        return this.loadScript(
          "owlcarousel",
          "../../../../assets/landing/lib/owlcarousel/owl.carousel.min.js"
        );
      })
      .then(() => {
        return this.loadScript("main", "../../../../assets/landing/js/main.js");
      })
      .catch((error) => {
        console.error("Error loading scripts:", error);
      });
  }

  loadScript(name: string, url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const scriptElement = document.createElement("script");
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

  initCounterUp(): void {
    // const $element = $(this.elementRef.nativeElement) as any;

    // $element.find('[data-toggle="counter-up"]').counterUp({
    //   delay: 10,
    //   time: 2000,
    // });
  }

  scrollToDiv() {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  }

  IDPlogin(): void {
    debugger;
    // window.open(environment.redirectUrl, "_self");
    // console.log(environment.redirectUrl, "sfds");
  }
  home() {
    debugger;
    this.router.navigate(["/landingpage"]);
  }
}
