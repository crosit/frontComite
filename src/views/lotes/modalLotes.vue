<template>
    <b-modal size="xl" v-model="modalVisible" hide-footer title="Lotes" @hidden="closeModal">
        <b-container>
            <div>
                <b-form @submit.prevent="submitForm">
                    <b-row>
                        <b-col class="columns">
                            <b-form-group label="folio" label-for="folio">
                                <b-form-input id="folio" v-model="form.folio"></b-form-input>
                                <span class="errores">{{ errors.folio }}</span>
                            </b-form-group>

                        </b-col>
                        <b-col class="columns">

                            <b-form-group label="Descripcion" label-for="descripcion">
                                <b-form-input id="descripcion" v-model="form.descripcion"></b-form-input>
                                <span class="errores">{{ errors.descripcion }}</span>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        
                        <b-col class="columns">

                            <b-form-group label="Fecha Inicio" label-for="fecha_inicio">
                                <b-form-input :disabled="!create" id="fecha_inicio" type="date" :min="minFecha" v-model="form.fecha_inicio"></b-form-input>
                                <span class="errores">{{ errors.fecha_inicio }}</span>
                            </b-form-group>

                        </b-col>
                        <b-col class="columns">

                            <b-form-group label="Fecha Fin" label-for="fecha_fin">
                                <b-form-input :disabled="!create" id="fecha_fin" :min="minFecha" v-model="form.fecha_fin" 
                                    type="date"></b-form-input>
                                <span class="errores">{{ errors.fecha_fin }}</span>
                            </b-form-group>
                        </b-col>
                        
                    </b-row>




                    <b-button class="mt-5" type="submit" variant="success" style="width: 100%;">{{create == true ? 'Crear' : 'Actualizar'}}</b-button>
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
                folio: '',
                descripcion: '',
                fecha_inicio: '',
                fecha_fin: '',
                
            },
            errors: {
                folio: '',
                descripcion: '',
                fecha_inicio: '',
                fecha_fin: '',
                
            },
            minFecha: this.formatearFecha(new Date()),
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
        }
    },
    methods: {
        closeModal() {
            this.showModal(false)

        },
        formatearFecha(fecha) {
            const fechaUTC = new Date(fecha);
            const dia = fechaUTC.getUTCDate();
            const mes = fechaUTC.getUTCMonth() + 1; // Los meses en JavaScript se cuentan desde 0, por lo que se suma 1
            const anio = fechaUTC.getUTCFullYear();
            const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
            return fechaFormateada;
        },
        enviar() {
            this.$axios.post('/lotes', this.form).then((response) => {
                if (response.data.data.status == 400) {
                    this.$toast.error(response.data.data.message);
                } else {
                    this.$toast.success(response.data.data.message);
                    this.get()
                    this.cleanForm()
                    this.closeModal()
                }

            }).catch((error) => {
                if (error.response.data.status == 400) {
                    this.$toast.error(error.response.data.message);

                }
                console.log(error)
            })
        },
        update() {
            this.$axios.put('/lotes/' + this.id, this.form).then((response) => {
                 console.log(response.data)
                if (response.data.data.status == 400) {
                    this.$toast.error('Error al actualizar');
                } else {
                    this.$toast.success('Lote actualizado');
                    this.get()
                    this.closeModal()
                }

            })
        },
        cleanForm() {
            this.form.folio = '';
            this.form.descripcion = '';
            this.form.fecha_inicio = '';
            this.form.fecha_fin = '';
        },
        submitForm() {
            this.validateForm();

            if (Object.keys(this.errors).every((key) => !this.errors[key])) {
                if (this.form.contrasena == this.form.repetir_contrasena) {
                    if (this.create == true) {
                        this.enviar();
                    } else {
                        this.update();
                    }
                } else {

                    this.$toast.error('Las contraseñas no coinciden');
                }
            } else {
                this.$toast.error('Faltan datos en el formulario');
            }
        },
        validateForm() {
            
                
            this.errors.folio = this.form.folio ? '' : 'El campo folio es requerido';
            this.errors.descripcion = this.form.descripcion ? '' : 'El campo Descripcion es requerido';
            this.errors.fecha_inicio = this.form.fecha_inicio ? '' : 'El campo Carrera es requerido';
            this.errors.fecha_fin = this.form.fecha_fin ? '' : 'El campo Correo Escolar es requerido';
            // console.log(this.errors, 'errors');
        },
        getUpdate() {
            if (this.create == false) {
                this.cleanForm()
                this.$axios.get('/lotes/' + this.id).then((response) => {
                     console.log(response, 'update');
                    this.form = response.data.data[0];
                    this.form.fecha_inicio = this.formatearFecha(this.form.fecha_inicio)
                    this.form.fecha_fin = this.formatearFecha(this.form.fecha_fin)
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