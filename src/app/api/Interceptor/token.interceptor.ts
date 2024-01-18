import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = localStorage.getItem("access_token");
  if(userToken){
    const authReq = req.clone({headers: req.headers.set("Authorization",`Bearer ${userToken}`)});
    return next(authReq)
  }
  else{
    return next(req);
  }
};
