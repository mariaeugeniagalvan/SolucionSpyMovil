import React from 'react';
import axios from 'axios';
import Reactable from 'reactable';
export default class ApiRest extends React.Component{

state = {
    productos : []
}

 async componentDidMount(){
    await this.callApi();
    this.interval = setInterval( async () =>
    await this.callApi(), 60000)
}


async callApi() {
    console.log("se llama el método");
    axios({
        method: 'post',
        url: 'http://api.spymovil.com/auth/token/',
        data: {
            username : "desarrollo",
            password:"spymovil2020"
        },
        }).then(respuesta => {
            axios({
                method: 'get',
                url: 'http://api.spymovil.com/data/online/',
                headers: {
                   Authorization : 'Bearer ' + respuesta.data.access
               }
                }).then(resp => {
                        const productos = resp.data;
                        productos.forEach(element => {
                            if(element.ph >= 0 && element.ph < 2)
                            {
                                element.ph = "Muy ácido";
                            }
                            if(element.ph >= 2 && element.ph < 4)
                            {
                                element.ph = "Moderadamente ácido";
                            }
                            if(element.ph >= 4 && element.ph < 7)
                            {
                                element.ph = "Ligeramente ácido";
                            }
                            if(element.ph >= 7 && element.ph < 8)
                            {
                                element.ph = "Neutro";
                            }
                            if(element.ph >= 8 && element.ph < 10)
                            {
                                element.ph = "Ligeramente alcalino";
                            }
                            if(element.ph >= 10 && element.ph < 13)
                            {
                                element.ph = "Moderadamente alcalino";
                            }
                            if(element.ph >= 13 && element.ph <= 14)
                            {
                                element.ph = "Muy alcalino";
                            }
                       });
                       this.setState({productos});
                });
        });
}


render(){
    var Table = Reactable.Table;
    return (
        <div>
           <h1>Tabla de productos</h1>
           <Table  className="table" data={this.state.productos}
            defaultSort={{column: 'nombre', direction: 'asc'}}
            filterable={['nombre', 'cloro', 'pH', 'turbidez', 'fecha', 'tipo']}
            sortable={[
                  'nombre',
                  'cloro',
                  'ph',
                  'turbidez',
                  'fecha',
                  'tipo']}
            />
        </div>
     )
}
}