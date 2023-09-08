import { Component, OnInit } from '@angular/core';
import { CouponUtils } from 'src/app/core/utils/coupon.utils';

@Component({
    selector: 'app-coupon',
    templateUrl: './coupon.component.html',
    styleUrls: ['./coupon.component.scss'],
})
export class CouponComponent implements OnInit {
    ngOnInit(): void {
        console.log('coupon', CouponUtils.generate());
    }
}
