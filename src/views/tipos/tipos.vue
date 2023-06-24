<template>
    <div>
        <div v-if="user.gefe_carrera == 1 || user.tipos_id <=2">

            <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
              <!-- Card stats -->
             
            </base-header>
            <b-container fluid class="mt--7">
                <div class="d-flex justify-content-end mb-4 mr-3">
    
                    <b-button @click="modalVisible=true;create = true" variant="primary" > <b-icon icon="plus-circle" aria-hidden="true"></b-icon> Add</b-button>
                </div>
                <b-card no-body class="bg-default shadow">
                    <b-card-header class=" border-0">
                        <h3 class="mb-0">Tipos de Usuarios</h3>
                    </b-card-header>
            
                    <el-table class="table-responsive table "
                              header-row-class-name="thead-light"
                              :data="data">
                        <el-table-column label="Id"
                                         min-width="110px"
                                         prop="id">
                            <template v-slot="{row}">
                                <b-media no-body class="align-items-center">
                                    
                                        <p>{{row.id}}</p>
                                </b-media>
                            </template>
                        </el-table-column>
    
                        <el-table-column label="Nombre"
                                         min-width="260px"
                                         prop="nombre">
                            <template v-slot="{row}">
                                <b-media no-body class="align-items-center">
                                    
                                        <p>{{row.descripcion}} </p>
                                </b-media>
                            </template>
                        </el-table-column>
    
    
                        <el-table-column label="Actions"
                                         min-width="110px"
                                         prop="nombre">
                            <template v-slot="{row}">
                                <b-media no-body class="align-items-center">
                                        <b-row>
                                            <b-col >
                                                
                                                <b-icon @click="modalVisible=true;create = false;nuevaCarrera.descripcion = row.descripcion;nuevaCarrera.id = row.id" v-b-tooltip.hover title="update" class="update-button" icon="box-arrow-in-down-left" variant="primary" aria-hidden="true"></b-icon>
                                            </b-col>
                                        
                                            <b-col >
                                                <b-icon v-b-tooltip.hover title="delete" class="delete-button" @click="deleted(row.id)"  icon="trash" variant="danger" aria-hidden="true"></b-icon>
                                            </b-col>
                                        </b-row>
                                </b-media>
                            </template>
                        </el-table-column>
            
                        
                    </el-table>
            
                </b-card>
    
    
            </b-container>
    
            <b-modal v-model="modalVisible" hide-footer title="Agregar Carrera">
                <div>
                    <label for="descripcion">Descripción:</label>
                    <b-form-input id="descripcion" v-model="nuevaCarrera.descripcion" placeholder="Ingrese la descripción"></b-form-input>
                </div>
    
                <div class="text-right mt-5">
                    <b-button @click="create == 1 ? enviar() : update()" variant="primary">Enviar</b-button>
                    <b-button @click="modalVisible=false" variant="danger">Cancelar</b-button>
                </div>
            </b-modal>
        </div>
        <div v-else>
            <b-container>
                <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
              <!-- Card stats -->
             
            </base-header>
                <h1 class="mt-5">Usted no tiene permisos para ver esta pagina</h1>
            </b-container>
        </div>
    </div>
</template>
<script>
  import { Table, TableColumn} from 'element-ui'
  export default {
    name: 'light-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        nuevaCarrera:{},
        create: null,
        currentPage: 1,
        data:null,
        modalVisible: false,
        user: null
      };
    },
    methods: {
        update(){
            this.$axios.put('/tipos/',this.nuevaCarrera).then((response) => {
                console.log(response.data)
                this.get()
                this.nuevaCarrera.descripcion = ""
                this.modalVisible=false
            })
        }, 
        enviar(){
            this.$axios.post('/tipos',this.nuevaCarrera).then((response) => {
                console.log(response.data)
                this.get()
                this.nuevaCarrera.descripcion = ""
                this.modalVisible=false
            })
        },
        deleted(id){
            this.$axios.delete('/tipos/'+id).then((response) => {
                console.log(response.data)
                this.get()
            })
        },
        get() {
            this.$axios.get('/tipos').then((response) => {
                console.log(response.data)
                this.data = response.data.data
            })
        },
        getpermisos() {
            this.user = JSON.parse( localStorage.getItem('user'))
        },  
    },
    mounted(){
        this.getpermisos()
        this.get()
    }
  }
</script>
<style scoped>
  .delete-button {
    font-size:16px; 
    
    padding: 0;
    color:rgb(212, 30, 30); 
  }
  :hover .delete-button {
    cursor: pointer;
    
  }
  .update-button {
    font-size:16px; 
    padding: 0;
    color:rgb(30, 48, 211); 
  }
  :hover .update-button {
    cursor: pointer;
    
  }
</style>
