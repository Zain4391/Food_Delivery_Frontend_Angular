import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";


// Intercepts incoming requests and adds authorization headers
export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService);
    const token = authService.getAuthToken();

    if(req.url.includes('/auth')) {
        return next(req);
    }

    if(token) {
        const cloneReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(cloneReq);
    }

    return next(req);
}