// Assets dialog

export const API_URL = "http://localhost:8000/";
// export const API_URL = "http://api-panel.iu.org.mx/";

export const deleteAssetTitle = "Eliminar activo";
export const deleteAssetBody = (controlNumber) =>
    `¿Desea eliminar el activo ${controlNumber}? Al realizar esta acción se eliminaran todos los datos, documentos y fotos pertenecientes a este activo. ¿Desea continuar?`;

export const deleteUser = "Eliminar activo";
export const deleteUserBody = (name) =>
    `¿Desea eliminar al usuario ${name}? Al realizar esta acción se eliminaran todos los datos. ¿Desea continuar?`;

