<template>
    <div>
        <div>

            <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
                <!-- Card stats -->
                <b-row v-if="user.gefe_carrera == 1 || user.tipos_id <= 2">
                    <b-col>
                        <label for="">Nombre</label>
                        <b-input v-model="inputValue" @input="handleInput"></b-input>
                    </b-col>
                    <b-col>
                        <label for="">Carreras</label>
                        <b-select class="" v-model="selectedOptionCarrera"
                            @change="filtroCarrera = `carreras_id=${selectedOptionCarrera}&`; get()">
                            <option v-for="option in carreras" :value="option.id" :key="option.id">{{ option.descripcion }}
                            </option>
                        </b-select>
                    </b-col>
                    <b-col>
                        <label for="">Lotes</label>
                        <b-select class="" v-model="selectedOptionLotes"
                            @change="filtroLotes = `lotes_id=${selectedOptionLotes}&`; get()">
                            <option v-for="option in lotes" :value="option.id" :key="option.id">{{ option.descripcion }}
                            </option>
                        </b-select>
                    </b-col>
                    <b-col>
                        <label for="">Estaus</label>
                        <b-select class="" v-model="selectedOptionEstatus"
                            @change="filtroEstatus = `estatus_id=${selectedOptionEstatus}&`; get()">
                            <option v-for="option in estatus" :value="option.id" :key="option.id">{{ option.descripcion }}
                            </option>
                        </b-select>
                    </b-col>
                    <!-- <b-col>

                        <label for="">Tipos</label>
                        <b-select class="" v-model="selectedOptionTipos"
                            @change="filtroTipos = `tipos_id = ${selectedOptionTipos}&`; get()">
                            <option v-for="option in tipos" :value="option.id" :key="option.id">{{ option.descripcion }}
                            </option>
                        </b-select>
                    </b-col>  -->
                    <b-col cols="1">
                        <label for=""> </label>
                        <br>
                        <b-button @click="clearFiltros()" variant="danger">X</b-button>
                    </b-col>
                </b-row>
            </base-header>
            <b-container fluid class="mt--7">
                <div class="d-flex justify-content-end mb-4 mr-3">

                    <b-button v-if="user.tipos_id == 3" @click="showModal(true); create = true" variant="primary"> <b-icon
                            icon="plus-circle" aria-hidden="true"></b-icon> Add</b-button>
                </div>
                <b-card no-body class="bg-default shadow">
                    <b-card-header class=" border-0">
                        <h3 class="mb-0">Usuarios</h3>
                    </b-card-header>

                    <el-table class="table-responsive table " header-row-class-name="thead-light" :data="data">
                        <el-table-column label="Id" min-width="110px" prop="id">
                            <template v-slot="{ row }">
                                <b-media no-body class="align-items-center">

                                    <p>{{ row.id }}</p>
                                </b-media>
                            </template>
                        </el-table-column>

                        <el-table-column label="Nombre" min-width="220px" prop="nombre">
                            <template v-slot="{ row }">
                                <b-media no-body class="align-items-center">

                                    <p>{{ row.nombre_full }}</p>
                                </b-media>
                            </template>
                        </el-table-column>

                        <el-table-column label="Descripcion" min-width="240px" prop="solicitud_descripcion">
                            <template v-slot="{ row }">
                                <b-media no-body class="align-items-center">

                                    <p>{{ row.solicitud_descripcion }}</p>
                                </b-media>
                            </template>
                        </el-table-column>

                        <el-table-column label="Carreras" min-width="269px" prop="descripcion_carreras">
                            <template v-slot="{ row }">
                                <b-media no-body class="align-items-center">

                                    <p>{{ row.descripcion_carreras }}</p>
                                </b-media>
                            </template>
                        </el-table-column>

                        <el-table-column label="Estatus" min-width="140px" prop="descripcion_estatus">
                            <template v-slot="{ row }">
                                <b-media no-body class="align-items-center">

                                    <p>{{ row.descripcion_estatus }}</p>
                                </b-media>
                            </template>
                        </el-table-column>


                        <el-table-column label="Actions" min-width="110px" prop="nombre">
                            <template v-slot="{ row }">
                                <b-media no-body class="d-flex justify-content-center">
                                    <b-row>
                                        <b-col v-if="user.tipos_id == 3">

                                            <b-icon
                                                @click="modalVisible = true; create = false; usuario.id = row.id; rowSelected = row;"
                                                v-b-tooltip.hover title="update" class="update-button"
                                                icon="box-arrow-in-down-left" variant="primary" aria-hidden="true"></b-icon>
                                        </b-col>
                                        <b-col v-else>
                                            <b-icon
                                                @click="modalVisibleInfo = true; create = false; usuario.id = row.id; rowSelected = row;"
                                                v-b-tooltip.hover title="update" class="update-button"
                                                icon="box-arrow-in-down-left" variant="primary" aria-hidden="true"></b-icon>
                                        </b-col>

                                        <b-col v-if="user.tipos_id == 3">
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


            <modal :modalVisible="modalVisible" :carreras="carreras" :tipos="tipos" :get="get" :showModal="showModal"
                :rowSelected="rowSelected" :create="create" :id="usuario.id" hide-footer title="Agregar Carrera">
            </modal>
            <modalInfo :usuario="user" :modalVisibleInfo="modalVisibleInfo" :carreras="carreras" :tipos="tipos" :get="get"
                :showModalInfo="showModalInfo" :rowSelected="rowSelected" :create="create" :id="usuario.id" hide-footer
                title="Agregar Carrera">
            </modalInfo>
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

    </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui'
import modal from './modalUsuarios.vue'
import modalInfo from './modalInfoSolicitudes.vue'
export default {
    name: 'light-table',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        modal,
        modalInfo
    },
    data() {
        return {
            usuario: {},
            create: null,
            currentPage: 1,
            data: null,
            filtroCarrera: '',
            selectedOptionCarrera: null,
            rowSelected: null,
            selectedOptionTipos: null,
            inputValue: '',
            modalVisibleInfo: false,
            timeoutId: null,
            filtroLike: '',
            selectedOptionLotes: null,
            selectedOptionEstatus: null,
            lotes: null,
            estatus: null,
            filtroLotes: '',
            filtroEstatus: '',

            carreras: null,
            tipos: null,
            modalVisible: false,
            user: {
                gefe_carrera: null,
                tipos_id: null
            }
        };
    },
    methods: {
        clearFiltros() {
            this.filtroCarrera = ''
            this.filtroLike = ''
            this.filtroLotes = ''
            this.filtroEstatus = ''
            this.selectedOptionCarrera = null
            this.selectedOptionLotes = null
            this.selectedOptionEstatus = null
            this.inputValue = '' 

            this.get()
        },
        handleInput() {
            // Reiniciar el temporizador si ya estaba en marcha
            clearTimeout(this.timeoutId);
            // console.log(this.inputValue, 'inputValue');
            if (this.inputValue == ' ') {
                this.filtroLike = ''
            } else {

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
        showModalInfo(value) {
            this.modalVisibleInfo = value
        },

        deleted(id) {
            this.$axios.delete('/Solicitudes/' + id).then((response) => {
                // console.log(response.data)
                this.get()
            })
        },
        get() {
            this.$axios.get('/Solicitudes?'+ this.filtroLike + this.filtroCarrera + this.filtroLotes + this.filtroEstatus).then((response) => {
                console.log(response.data, 'solicitudes')

                this.data = response.data.data
            }).catch((error) => {
                error.response.status == 401 ? this.$router.push('/page-401') :
                    console.log(error, 'error')
            })
        },
        getpermisos() {
            this.user = JSON.parse(localStorage.getItem('user'))
        },
        getCarreras() {
            this.$axios.get('/carreras').then((response) => {
                // console.log(response.data, 'carreras')
                this.carreras = response.data.data
            })
        },
        getTipos() {
            this.$axios.get('/tipos').then((response) => {
                // console.log(response.data, 'tipos')
                this.tipos = response.data.data
            })
        },
        formatearFecha(fecha) {
            const fechaUTC = new Date(fecha);
            const dia = fechaUTC.getUTCDate();
            const mes = fechaUTC.getUTCMonth() + 1; // Los meses en JavaScript se cuentan desde 0, por lo que se suma 1
            const anio = fechaUTC.getUTCFullYear();
            const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}-${mes < 10 ? '0' : ''}${mes}-${anio}`;
            return fechaFormateada;
        },
        getLotes() {
            this.$axios.get('/lotes').then((response) => {
                // console.log(response.data, 'lotes')
                this.lotes = response.data.data
            })
        },
        getEstatus() {
            this.$axios.get('/estatus').then((response) => {
                // console.log(response.data, 'estatus')
                this.estatus = response.data.data
            })
        },
        


    },
    mounted() {
        this.getpermisos()
        this.get()
        if (this.user.tipos_id != 3) {

            this.getCarreras()
            this.getLotes()
            this.getEstatus()
        }
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

}
</style>




