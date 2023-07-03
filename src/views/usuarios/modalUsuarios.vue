<template>
    <b-modal size="xl" v-model="modalVisible" hide-footer title="Usuarios" @hidden="closeModal">
        <b-container>
            <div>
                <b-form @submit.prevent="submitForm">
                    <b-row>
                        <b-col class="columns">
                            <b-form-group label="Nombre" label-for="nombre">
                                <b-form-input id="nombre" v-model="form.nombre"></b-form-input>
                                <span class="errores">{{ errors.nombre }}</span>
                            </b-form-group>

                        </b-col>
                        <b-col class="columns">

                            <b-form-group label="Apellido Paterno" label-for="apellido_p">
                                <b-form-input id="apellido_p" v-model="form.apellido_p"></b-form-input>
                                <span class="errores">{{ errors.apellido_p }}</span>
                            </b-form-group>
                        </b-col>
                        <b-col class="columns">

                            <b-form-group label="Apellido Materno" label-for="apellido_m">
                                <b-form-input id="apellido_m" v-model="form.apellido_m"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col class="columns">

                            <b-form-group label="Carrera" label-for="carreras_id">
                                <b-select class="" v-model="form.carreras_id">
                                    <option v-for="option in carreras" :value="option.id" :key="option.id">{{
                                        option.descripcion }}
                                    </option>
                                </b-select>
                                <span class="errores">{{ errors.carreras_id }}</span>
                            </b-form-group>

                        </b-col>
                        <b-col class="columns">

                            <b-form-group label="Teléfono" label-for="telefono">
                                <b-form-input id="telefono" type="number" v-model="form.telefono"></b-form-input>
                                <span class="errores">{{ errors.telefono }}</span>
                            </b-form-group>

                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col class="columns">

                            <b-form-group label="Correo Escolar" label-for="correo_escolar">
                                <b-form-input id="correo_escolar" v-model="form.correo_escolar" autocomplete="new-email"
                                    type="email"></b-form-input>
                                <span class="errores">{{ errors.correo_escolar }}</span>
                            </b-form-group>
                        </b-col>
                        <b-col class="columns">

                            <b-form-group label="Correo Personal" label-for="correo_personal">
                                <b-form-input id="correo_personal" v-model="form.correo_personal" autocomplete="new-email"
                                    type="email"></b-form-input>
                                <span class="errores">{{ errors.correo_personal }}</span>
                            </b-form-group>

                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col class="columns">

                            <b-form-group label="Contraseña" label-for="contrasena">
                                <b-form-input id="contrasena" v-model="form.contrasena" type="password"
                                    autocomplete="new-password"></b-form-input>
                                <span class="errores">{{ errors.contrasena }}</span>
                            </b-form-group>


                        </b-col>
                        <b-col class="columns">

                            <b-form-group label="Repetir Contraseña" label-for="repetir_contrasena">
                                <b-form-input id="repetir_contrasena" v-model="form.repetir_contrasena"
                                    type="password"></b-form-input>
                            </b-form-group>


                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col class="columns">
                            <b-form-group label="Tipo de Usuario" label-for="tipos_id">

                                <b-select class="" v-model="form.tipos_id">
                                    <option v-for="option in tipos" :value="option.id" :key="option.id">{{
                                        option.descripcion }}
                                    </option>
                                </b-select>
                                <span class="errores">{{ errors.tipos_id }}</span>
                            </b-form-group>

                        </b-col>
                        <b-col class="columns text-center" cols="2">
                            <b-form-group label="Jefe de Carrera" label-for="gefe_carrera">
                                <b-form-checkbox id="gefe_carrera" v-model="form.gefe_carrera"></b-form-checkbox>
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
                nombre: '',
                apellido_p: '',
                apellido_m: '',
                carreras_id: '',
                telefono: '',
                correo_escolar: '',
                correo_personal: '',
                contrasena: '',
                repetir_contrasena: '',
                tipos_id: '',
                gefe_carrera: false
            },
            errors: {
                nombre: '',
                apellido_p: '',
                carreras_id: '',
                telefono: '',
                correo_escolar: '',
                correo_personal: '',
                tipos_id: '',
                gefe_carrera: ''
            },
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
        enviar() {
            // console.log(this.form, 'form');
            // console.log(this.form.gefe_carrera, 'form.gefe_carrera');
            if (this.form.gefe_carrera == true) {
                this.form.gefe_carrera = 1;
            }else{
                this.form.gefe_carrera = 0;
            }
            this.$axios.post('/usuarios', this.form).then((response) => {
                // console.log(response.data)
                if (response.data.data.status == 400) {
                    this.$toast.error(response.data.data.message);
                } else {
                    this.$toast.success(response.data.data.message);
                    this.get()
                    this.cleanForm()
                    this.closeModal()
                }

            })
        },
        update() {
            this.$axios.put('/usuarios/' + this.id, this.form).then((response) => {
                //  console.log(response.data)
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
            this.form.nombre = '';
            this.form.apellido_p = '';
            this.form.apellido_m = '';
            this.form.carreras_id = '';
            this.form.telefono = '';
            this.form.correo_escolar = '';
            this.form.correo_personal = '';
            this.form.contrasena = '';
            this.form.repetir_contrasena = '';
            this.form.tipos_id = '';
            this.form.gefe_carrera = false;
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
            if ('contrasena' in this.form) {
                if (this.form.contrasena.length < 8 && this.form.contrasena.length > 0) {
                    this.errors.contrasena = 'La contraseña debe tener al menos 8 caracteres';
                } else {
                    this.errors.contrasena = '';
                }
            }
                
            this.errors.nombre = this.form.nombre ? '' : 'El campo Nombre es requerido';
            this.errors.apellido_p = this.form.apellido_p ? '' : 'El campo Apellido Paterno es requerido';
            this.errors.carreras_id = this.form.carreras_id ? '' : 'El campo Carrera es requerido';
            this.errors.telefono = this.form.telefono ? '' : 'El campo Teléfono es requerido';
            this.errors.correo_escolar = this.form.correo_escolar ? '' : 'El campo Correo Escolar es requerido';
            this.errors.correo_personal = this.form.correo_personal ? '' : 'El campo Correo Personal es requerido';
            this.errors.tipos_id = this.form.tipos_id ? '' : 'El campo Tipo de Usuario es requerido';
            // console.log(this.errors, 'errors');
        },
        getUpdate() {
            if (this.create == false) {
                this.cleanForm()
                this.$axios.get('/usuarios/' + this.id).then((response) => {
                    // console.log(this.carreras, 'update');
                    this.form = response.data.data[0];
                    this.form.carreras_id = response.data.data[0].carreras_id;
                    this.form.tipos_id = response.data.data[0].tipos_id;
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