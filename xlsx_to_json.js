let selectedFile;

document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{}]

document.getElementById('button').addEventListener("click", () => {

    if(selectedFile){

        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
      
        fileReader.onload = (event)=>{

         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});

         workbook.SheetNames.forEach((sheet, index) => {

            if (sheet === 'Ejemplo Base de Datos') {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);

                const jsonData = filterXlsxJson(rowObject);
                console.log(jsonData);
                document.getElementById("jsondata").innerHTML = JSON.stringify(jsonData, undefined, 2);
            }
         });
        }
    }
});

function filterXlsxJson(rowObject) {
    
    const entriesArray = [];

    rowObject.forEach( (row, index) => {    
    
        if(index !== 0) {
            const mapEntry = {};
            
            Object.entries(row).forEach(([key, value], i) => {
                mapEntry[POINT_PROPS[i]] = value ;
            });

            entriesArray.push(mapEntry);
        }
    });

    return entriesArray;
}

const POINT_PROPS = [
    'estado',
    'placa',
    'programa',
    'autoridad_ambiental',
    'departamento',
    'ciudad_municipio',
    'grupo',
    'nombre_punto',
    'direccion',
    'localidad',
    'barrio',
    'estrata',
    'persona_encargada',
    'cargo',
    'telefono',
    'celular',
    'email',
    'frecuencia_recoleccion',
    'observaciones'
];