import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const id_token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU3MzcyMDExNH0.ow8Yq0c_HZTWphhVg1xNbwzpK0miIoJK8Bf233qUF4MLVjt1DRB_KUHj1Ok9CbOEa9fdyP_zzs1s7gwdHoKqDw";
        const accounts = {
            "cbnv": {
                "username": "cbnv",
                "authorities": ["ROLE_NHANVIEN"],
                "activated": true
            }, "quanly": {
                "username": "quanly",
                "authorities": ["ROLE_NHANVIEN", "ROLE_QUANLY"],
                "activated": true
            }, "hr": {
                "username": "admin",
                "authorities": ["ROLE_NHANVIEN", "ROLE_QUANLY", "ROLE_HR"],
                "activated": true
            },
            "admin": {
                "username": "admin",
                "authorities": ["ROLE_NHANVIEN", "ROLE_QUANLY", "ROLE_HR", "ROLE_ADMIN"],
                "activated": true
            }
        };
        return {id_token, accounts};
    }
}