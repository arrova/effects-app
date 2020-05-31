import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
    constructor(
        private actions$: Actions, // Si es un observable podemos ponerle un signo de $ al final 
        private uS: UsuarioService
    ){}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            // tap( data  => console.log('effect tap ', data)), esto es para ver que la información esta fluyendo
            switchMap(
                () => this.uS.getUsers()
                    .pipe(
                        map(users => usuariosActions.cargarUsuariosSuccess( {usuarios: users } )),
                        catchError((error: Error) => {
                            return of(usuariosActions.cargarUsuariosError({payload: error}));
                        })
                        // tap( data => console.log('getUsers effect ', data)) Es lo mismo
                    )
            )
        )
    );
}
