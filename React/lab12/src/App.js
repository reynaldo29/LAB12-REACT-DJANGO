import React,{ Component } from 'react';
import axios from 'axios';
import './App.css';


class App extends Component{
  constructor(props){
    super(props);
    this.state = ({
      prestamos : [],
      pos : null,
      titulo : 'Nuevo',
      id: 0,
      libro:'',
      usuario:'',
      fecha_prestamo: '',
      fecha_devolucion:''
      
    })

    
    this.cambioLibro = this.cambioLibro.bind(this);
    this.cambioCliente = this.cambioCliente.bind(this);
    this.cambioFechaPrestamo = this.cambioFechaPrestamo.bind(this);
    this.cambioFechaDevolucion = this.cambioFechaDevolucion.bind(this);
    this.mostrar=this.mostrar
    this.eliminar = this.eliminar.bind(this);
    this.guardar = this.guardar.bind(this);

  }
  //CARGA LA LISTA DE PRESTAMOS
  componentWillMount(){
    axios.get('http://127.0.0.1:8000/prestamos/')
    .then(res => {
      this.setState({ prestamos: res.data })
    })
  }
  //MÉTODOS PARA ACTUALIZAR LOS VALORES DEFINIDOS EN EL CONSTRUCTOR
  cambioLibro(e){
    this.setState({
      libro: e.target.value
    })
  }
  cambioCliente(e){
    this.setState({
      usuario: e.target.value
    })
  }
  cambioFechaPrestamo(e){
    this.setState({
      fecha_prestamo: e.target.value
    })
  }
  cambioFechaDevolucion(e){
    this.setState({
      fecha_devolucion: e.target.value
    })
  }
  //MUESTRA UNA SERIE
  mostrar(cod,index){
    axios.get('http://127.0.0.1:8000/prestamos/'+cod+'/')
    .then(res=>{
      this.setState({
        pos:index,
        titulo:'Editar',
        id: res.data.id,
        libro: res.data.libro,
        usuario: res.data.usuario,
        fecha_prestamo: res.data.fecha_prestamo,
        fecha_devolucion: res.data.fecha_devolucion
      })
    })
  }
  //MÉTODO PARA GUARDAR
  guardar(e){
    e.preventDefault();
    let cod = this.state.id;
    let datos = {
      libro:this.state.libro,
      usuario: this.state.usuario,
      fecha_prestamo: this.state.fecha_prestamo,
      fecha_devolucion: this.state.fecha_devolucion,
     
    }
    if(cod>0){
      axios.put('http://127.0.0.1:8000/prestamos/'+cod+'/',datos)
      .then(res =>{
        let indx = this.state.pos;
        this.state.prestamos[indx] = res.data;
        var temp = this.state.prestamos;
        this.setState({
          pos:null,
          titulo:'Nuevo',
          id:0,
          libro: '',
          usuario: '',
          fecha_prestamo: '',
          fecha_devolucion: '',
          prestamos : temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      });
    }else{
      axios.post('http://127.0.0.1:8000/prestamos/',datos)
      .then(res=>{
        this.state.prestamos.push(res.data);
        var temp = this.state.prestamos;
        this.setState({
          id:0,
          libro: '',
          usuario: '',
          fecha_prestamo: '',
          fecha_devolucion: '',
          prestamos: temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      });
    }
  }
  //MÉTODO QUE ELIMINA
  eliminar(cod){
    let rpta = window.confirm("Desea eliminar?");
    if(rpta){
      axios.delete('http://127.0.0.1:8000/prestamos/'+cod+'/')
      .then(res => {
        var temp= this.state.prestamos.filter((prestamo)=>prestamo.id != cod);
        this.setState({
          prestamos:temp
        })
      });
    }
  }
  render(){
    return (<div class='container'>
        <h1>Prestamos</h1>
        <table class="table table-striped">
          <thead>
              <tr>
                <th>Ejemplar</th>
                <th>Libro</th>
                <th>Cliente</th>
                <th>Inicio</th>
                <th>Fin</th>
              </tr>
          </thead>
          <tbody>
            {this.state.prestamos.map((prestamo,index) => {
              return(
                <tr key={prestamo.id}>
                  <td>{prestamo.id}</td>
                    <td>{prestamo.libro}</td>
                    <td>{prestamo.usuario}</td>
                    <td>{prestamo.fecha_prestamo}</td>
                    <td>{prestamo.fecha_devolucion}</td>
                    <td>
                        
                        <button type="button" class = "btn btn-primary" onClick={()=>this.mostrar(prestamo.id,index)}>Editar
                          </button>
                        <button class = "btn btn-danger"  onClick={()=>this.eliminar(prestamo.id)}>
                        <span class = "glyphicon glyphicon-trash"></span>
                        </button>
                    </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr/>
        <h1>{this.state.titulo}</h1>
        <form onSubmit={this.guardar}>
            <input type="hidden" value={this.state.id}></input>
            <p>
              Ingrese id Libro:
              <input class="form-control"type="text" value={this.state.libro} onChange={this.cambioLibro}></input>
            </p>
            <p>
              Ingrese id Cliente:
              <input class="form-control" type="text" value={this.state.usuario} onChange={this.cambioCliente}></input>
            </p>
            <p>
              Fecha de prestamo:
              <input class="form-control" type="text" value={this.state.fecha_prestamo} onChange={this.cambioFechaPrestamo}></input>
            </p>
            <p>
              Fecha de devolucion:
              <input class="form-control" type="text" value={this.state.fecha_devolucion} onChange={this.cambioFechaDevolucion}></input>
            </p>
            <p>
              <input class = "btn btn-primary" type="submit"></input>
            </p>
        </form>
        <p>
</p>


        
    </div>);
  }
  
}

export default App;