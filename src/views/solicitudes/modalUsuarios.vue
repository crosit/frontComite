<template>
    <b-modal size="xl" v-model="modalVisible" hide-footer title="Solicitudes" @hidden="closeModal">
        <b-container>
            <div>
                <b-form @submit.prevent="submitForm">
                    <b-row>
                        <b-col class="columns">
                            <b-form-group label="Descripcion" label-for="descripcion">
                                <b-form-input id="descripcion" v-model="form.descripcion"></b-form-input>
                                <span class="errores">{{ errors.descripcion }}</span>
                            </b-form-group>

                        </b-col>

                    </b-row>
                    <div class="d-flex justify-content-end mb-4">

                        <b-button @click="addFile()" variant="primary">+ Archivo</b-button>
                    </div>
                    <b-row v-for="item in contadorArchivos" :key="item">
                        <b-col >
                            <b-form-file class="mb-5" v-model="selectedFiles[item -1]" @change="handleFileChange"></b-form-file>
                            <span class="errores">{{ errors.selectedFiles }}</span>
                        </b-col>
                    </b-row>


                    <b-button  class="mt-5" type="submit" variant="success" style="width: 100%;">{{ create == true ? 'Crear'
                        :
                        'Actualizar' }}</b-button>
                </b-form>
            </div>
        </b-container>
    </b-modal>
</template>

<script>
export default {
    data() {
        return {
            form: {
                descripcion: '',
                
            },
            errors: {
                descripcion: '',
                selectedFiles: '',
            },
            selectedFiles: [],
            contadorArchivos: 1,
            selectedOptionCarrera: null,
            selectedOptionTipos: null,


        }
    },
    props: {
        modalVisible: {
            type: Boolean,

        },
        showModal: {
            type: Function,

        },
        get: {
            type: Function,

        },
        carreras: {
            type: Array,

        },
        tipos: {
            type: Array,

        },
        create: {
            type: Boolean,
        },
        id: {
            type: Number,
            default: 0
        },
        rowSelected: {
            type: Object,
            
        }
    },
    methods: {
        addFile() {
            if (this.contadorArchivos >= 3) {
                this.$toast.error('Solo se pueden agregar 3 archivos');
            }else{
                
                this.contadorArchivos++;
            }
        },
        handleFileChange(event) {
            // this.selectedFiles = Array.from(event.target.files);
        },
        closeModal() {
            this.showModal(false)

        },
        async enviarDocuementos() {
            const formData = new FormData();
            console.log(this.selectedFiles, 'selectedFiles');
            this.selectedFiles.forEach(async (file) => {
                if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
                    console.log(file, 'file');
                    formData.append('documento', file);
                    await this.$axios.post('/servidorDocumentos', formData).then(async (response) => {
                        console.log(response.data)
                        if (response.data.status == 200) {
                            await this.envioUrl(response.data.data);
                        } else {
                            this.$toast.error('Error al subir archivos');
                        }
        
                    })
                }else{
                    this.$toast.error('Solo se permiten archivos PDF');
                }
            });
            
        },
        formatearFecha() {
            const fechaUTC = new Date();
            const dia = fechaUTC.getUTCDate();
            const mes = fechaUTC.getUTCMonth() + 1; // Los meses en JavaScript se cuentan desde 0, por lo que se suma 1
            const anio = fechaUTC.getUTCFullYear();
            const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
            return fechaFormateada;
        },
        async envioUrl(data) {
            this.form.fecha_inicio = this.formatearFecha();
            this.form.fecha_fin = this.formatearFecha();
            this.form.url = data.url;
            this.form.nombre = data.nombre;
            await this.$axios.post('/solicitudes', this.form).then((response) => {
                // console.log(response.data)
                if (response.data.status == 400) {
                    this.$toast.error(response.data.data.message);
                } 

            })
        },
        enviar() {
            this.enviarDocuementos();
            
            
        },
        update() {
            this.$axios.put('/Solicitudes/' + this.id, this.form).then((response) => {
                console.log(response.data)
                if (response.data.data.status == 400) {
                    this.$toast.error('Error al actualizar');
                } else {
                    this.$toast.success('Usuario actualizado');
                    this.get()
                    this.closeModal()
                }

            })
        },
        cleanForm() {
            this.form.descripcion = '';
            this.selectedFiles = [];
            this.contadorArchivos = 1;
        },
        submitForm() {
            this.validateForm();

            if (Object.keys(this.errors).every((key) => !this.errors[key])) {

                    if (this.create == true) {
                        this.enviar();
                    } else {
                        this.update();
                    }
                
            } else {
                this.$toast.error('Faltan datos en el formulario');
            }
        },
        validateForm() {
           

            this.errors.descripcion = this.form.descripcion ? '' : 'El campo descripcion es requerido';
            this.errors.selectedFiles = this.selectedFiles.length > 0 ? '' : 'El campo archivo es requerido';
            
            // console.log(this.errors, 'errors');
        },
        getUpdate() {
            if (this.create == false) {
                this.cleanForm()
                this.$axios.get('/Solicitudes/' + this.rowSelected.solicitudes_usuarios_id).then((response) => {
                    console.log(this.carreras, 'update');
                    this.form = response.data.data[0];
                    
                })
            }
        }
    },
    // mounted() {
    //     this.getUpdate()
    // },
    watch: {
        id() {

            this.getUpdate()
        },
        create() {
            if (this.create == true) {
                this.cleanForm()
            }
        }
    }

}
</script>

<style scoped>
.errores {
    color: red;
    font-size: 13px;
    border: 0;
    padding: 0;
    display: block;


}

.columns {
    min-width: 300px;
    padding-bottom: 0;
}
</style>