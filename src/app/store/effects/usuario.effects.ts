import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
    constructor(
        private actions$: Actions, // Si es un observable podemos ponerle un signo de $ al final 
        private uS: UsuarioService
    ){}

    cargarUsuarioById$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuario ),
            // tap( data  => console.log('effect tap ', data)), esto es para ver que la información esta fluyendo
            switchMap(
                (action) => this.uS.getUserById( action.id )
                    .pipe(
                        map(user => usuariosActions.cargarUsuarioSuccess( {usuario: user } )),
                        catchError((error: Error) => {
                            return of(usuariosActions.cargarUsuarioError({payload: error}));
                        })
                        // tap( data => console.log('getUsers effect ', data)) Es lo mismo
                    )
            )
        )
    );
}
