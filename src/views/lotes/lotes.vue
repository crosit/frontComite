<template>
    <div>
        <div v-if="user.gefe_carrera == 1 || user.tipos_id <= 2">

            <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
                <!-- Card stats -->
                <b-row>
                    <b-col cols="4">
                        <label for="">Fecha Inicio</label>
                        <b-form-input  @input="filtroFecha()"  type='date' v-model="fechaInicio" placeholder="Seleccionar fecha"></b-form-input>
                    </b-col>
                    <b-col cols="4">
                        <label for="">Fecha Fin</label>
                        <b-form-input @input="filtroFecha()"  type='date' v-model="fechaFin" placeholder="Seleccionar fecha"></b-form-input>
                    </b-col>
                    <!-- <b-col>

                        <label for="">Carreras</label>
                        <b-select class="" v-model="selectedOptionCarrera"
                            @change="filtroCarrera = `carreras_id = ${selectedOptionCarrera}&`; get()">
                            <option v-for="option in carreras" :value="option.id" :key="option.id">{{ option.descripcion }}
                            </option>
                        </b-select>
                    </b-col>
                    <b-col>

                        <label for="">Tipos</label>
                        <b-select class="" v-model="selectedOptionTipos"
                            @change="filtroTipos = `tipos_id = ${selectedOptionTipos}&`; get()">
                            <option v-for="option in tipos" :value="option.id" :key="option.id">{{ option.descripcion }}
                            </option>
                        </b-select>
                    </b-col> -->
                    <b-col cols="1">
                        <label for=""> </label>
                        <br>
                        <b-button @click="clearFiltros()" variant="danger">X</b-button>
                    </b-col>
                </b-row>
            </base-header>
            <b-container fluid class="mt--7">
                <div class="d-flex justify-content-end mb-4 mr-3">

                    <b-button @click="showModal(true); create = true" variant="primary"> <b-icon icon="plus-circle"
                            aria-hidden="true"></b-icon> Add</b-button>
                </div>
                <b-card no-body class="bg-default shadow">
                    <b-card-header class=" border-0">
                        <h3 class="mb-0">Lotes</h3>
                    </b-card-header>

                    <el-table class="table-responsive table " header-row-class-name="thead-light" :data="data">
                        <el-table-column label="Id" min-width="110px" prop="id">
                            <template v-slot="{ row }">
                                <b-media no-body class="align-items-center">

                                    <p>{{ row.id }}</p>
                                </b-media>
                            </template>
                        </el-table-column>

                        <el-table-column label="Folio" min-width="260px" prop="folio">
                            <template v-slot="{ row }">
                                <b-media no-body class="align-items-center">

                                    <p>{{ row.folio }}</p>
                                </b-media>
                            </template>
                        </el-table-column>

                        <el-table-column label="Descripcion" min-width="260px" prop="descripcion">
                            <template v-slot="{ row }">
                                <b-media no-body class="align-items-center">

                                    <p>{{ row.descripcion }}</p>
                                </b-media>
                            </template>
                        </el-table-column>


                        <el-table-column label="Fecha Inicio" min-width="260px" prop="fecha_inicio">
                            <template v-slot="{ row }">
                                <b-media no-body class="align-items-center">

                                    <p>{{ formatearFecha(row.fecha_inicio) }}</p>
                                </b-media>
                            </template>
                        </el-table-column>

                        <el-table-column label="Fecha fin" min-width="260px" prop="fecha_fin">
                            <template v-slot="{ row }">
                                <b-media no-body class="align-items-center">

                                    <p>{{ formatearFecha(row.fecha_fin) }}</p>
                                </b-media>
                            </template>
                        </el-table-column>


                        <el-table-column label="Actions" min-width="110px" prop="nombre">
                            <template v-slot="{ row }">
                                <b-media no-body class="align-items-center">
                                    <b-row>
                                        <b-col>

                                            <b-icon
                                                @click="modalVisible = true; create = false; usuario.id = row.id"
                                                v-b-tooltip.hover title="update" class="update-button"
                                                icon="box-arrow-in-down-left" variant="primary" aria-hidden="true"></b-icon>
                                        </b-col>

                                        <b-col>
                                            <b-icon v-b-tooltip.hover title="delete" class="delete-button"
                                                @click="deleted(row.id)" icon="trash" variant="danger"
                                                aria-hidden="true"></b-icon>
                                        </b-col>
                                    </b-row>
                                </b-media>
                            </template>
                        </el-table-column>


                    </el-table>

                </b-card>


            </b-container>


            <modal 
                :modalVisible="modalVisible" 
                :carreras="carreras" 
                :tipos="tipos"  
                :get="get" 
                :showModal="showModal" 
                :create="create"
                :id="usuario.id"
                hide-footer title="Agregar Carrera"
                >
            </modal>
            <!-- <b-modal v-model="modalVisible" hide-footer title="Agregar Carrera">
                <div>
                    <label for="descripcion">Descripción:</label>
                    <b-form-input id="descripcion" v-model="usuario.descripcion" placeholder="Ingrese la descripción"></b-form-input>
                </div>
    
                <div class="text-right mt-5">
                    <b-button @click="create == 1 ? enviar() : update()" variant="primary">Enviar</b-button>
                    <b-button @click="modalVisible=false" variant="danger">Cancelar</b-button>
                </div>
            </b-modal> -->
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
import { Table, TableColumn } from 'element-ui'
import modal from './modalLotes.vue'
export default {
    name: 'light-table',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        modal
    },
    data() {
        return {
            usuario: {},
            create: null,
            currentPage: 1,
            data: null,
            selectedOptionCarrera: null,
            selectedOptionTipos: null,
            inputValue: '',
            fechaInicio: null,
            fechaFin: null,
            timeoutId: null,
            carreras: null,
            tipos: null,
            filtroFechas: '',
            modalVisible: false,
            user: {
                gefe_carrera: null,
                tipos_id: null
            }
        };
    },
    methods: {
        clearFiltros() {
            this.fechaInicio = null
            this.fechaFin = null    
            this.filtroFechas = ''
            this.get()
        },
        filtroFecha() {
            if (this.fechaInicio != null && this.fechaFin != null) {
                this.filtroFechas = `fecha_inicio=${this.fechaInicio}&&fecha_fin=${this.fechaFin}`
                this.get()
            }
           
        },
        formatearFecha(fecha) {
            const fechaUTC = new Date(fecha);
            const dia = fechaUTC.getUTCDate();
            const mes = fechaUTC.getUTCMonth() + 1; // Los meses en JavaScript se cuentan desde 0, por lo que se suma 1
            const anio = fechaUTC.getUTCFullYear();
            const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}-${mes < 10 ? '0' : ''}${mes}-${anio}`;
            return fechaFormateada;
        },
        handleInput() {
            // Reiniciar el temporizador si ya estaba en marcha
            clearTimeout(this.timeoutId);
            // console.log(this.inputValue, 'inputValue');
            if (this.inputValue == ' ') {
                this.filtroLike = ''
            }else{

                this.filtroLike = `like=${this.inputValue}&`
            }
            // Establecer un nuevo temporizador para ejecutar la función después de 1 segundo
            this.timeoutId = setTimeout(() => {
                this.get();
            }, 800);
        },
        showModal(value) {
            this.modalVisible = value
        },
       
        deleted(id) {
            this.$axios.delete('/lotes/' + id).then((response) => {
                // console.log(response.data)
                this.get()
            })
        },
        get() {
            this.$axios.get('/lotes?'+this.filtroFechas ).then((response) => {
                // console.log(response.data)
                
                this.data = response.data.data
            }).catch((error) => {
                error.response.status == 401 ?  this.$router.push('/page-401') :
                console.log(error, 'error')
            })
        },
        getpermisos() {
            this.user = JSON.parse(localStorage.getItem('user'))
        },
        


    },
    mounted() {
        this.getpermisos()
        this.get()
       
    }
}
</script>
<style scoped>
.delete-button {
    font-size: 16px;

    padding: 0;
    color: rgb(212, 30, 30);
}

:hover .delete-button {
    cursor: pointer;

}

.update-button {
    font-size: 16px;
    padding: 0;
    color: rgb(30, 48, 211);
}

:hover .update-button {
    cursor: pointer;

}</style>




