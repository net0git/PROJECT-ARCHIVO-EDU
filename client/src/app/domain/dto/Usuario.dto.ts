export interface UsuarioResponse {
    id_usuario: number;
    usuario: string;
    password?: string;
    estado: boolean;
    archivo_sede: string;
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    dni: string;
    perfil?: string | null;
}

export interface CrearUsuarioResponse {
    text: string;
}

export interface EliminarUsuarioResponse{
    text: string
}

export interface ModificarUsuarioResponse{
    text: string
}

export interface modificarPasswordResponse{
    text: string
}