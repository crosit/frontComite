<template>
    <b-modal size="xl" v-model="modalVisibleInfo" hide-footer title="Solicitudes" @hidden="closeModal">
        <b-container>
            <div class="row">
                <div class="col-md-6">
                    <b-row>
                        <b-col>

                            <div>
                                <label for="">Descripcion</label>
                                <p>{{ form.solicitud_descripcion }}</p>
                            </div>
                        </b-col>
                        <b-col class="text-right">
                            <label for="">Fecha:</label>
                            <p>{{ formatearFecha(form.solicitudes_createdAt) }}</p>
                        </b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col>
                            <label for="">Nombre</label>
                            <p>{{ form.nombre_full }}</p>
                        </b-col>
                        <b-col>
                            <label for="">Carrera</label>
                            <p>{{ form.descripcion_carreras }}</p>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <label for="">Lote</label>
                            <p>{{ form.lotes_folio }} - {{ form.lotes_descripcion }}</p>
                        </b-col>
                    </b-row>
                    <br>
                    <label for="">Documentos</label>
                    <div v-for="item in form.documentos">
                        <b-row>
                            <b-col @click="descargarArchivo(item)" class="documentos">
                                <p>{{ item.nombre }}</p>
                            </b-col>

                        </b-row>
                    </div>
                    <br>
                    <div v-if="form.estatus_id == 2 && usuario.tipos_id == 2 && usuario.gefe_carrera == 0">

                        <label for="">Comentario del Comite</label>
                        <b-form-textarea v-model="comentario_comite" placeholder="Ingrese un comentario"></b-form-textarea>
                        <p class="errores" v-if="comentario_comite == null">Campo Obligatorio</p>
                    </div>
                    <div v-if="form.estatus_id == 3 && usuario.tipos_id == 1 && usuario.gefe_carrera == 0">

                        <label for="">Comentarios del Comite</label>
                        <p>{{ form.solicitudes_comentario }}</p>
                    </div>
                    <div>

                        <br>
                        <div v-if="form.estatus_id == 5 && usuario.tipos_id <= 2 ">
                            
                            <label for="">Veredicto final</label>
                            <p :style="form.veredicto == 'Aceptado' ? 'color:green;' : 'color:red;'">{{ form.veredicto }}</p>
                        </div>
                        <br>
                    </div>
                    <div class="d-flex justify-content-center" v-if="form.estatus_id == 1 && usuario.gefe_carrera == 1">

                        <b-row>
                            <b-col>
                                <b-button @click="aceptadoParaComite()" variant="success">Aceptar</b-button>
                            </b-col>
                            <b-col>
                                <b-button @click="form.veredicto = 'Rechazado';rechazadoParaComite()" variant="danger">Rechazar</b-button>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="d-flex justify-content-center"
                        v-if="form.estatus_id == 2 && usuario.tipos_id == 2 && usuario.gefe_carrera == 0">

                        <b-row>
                            <b-col>
                                <b-button @click="aceptadoParaAdministracion()" variant="success">Aceptar</b-button>
                            </b-col>
                            <b-col>
                                <b-button @click="form.veredicto = 'Rechazado';rechazadoParaComite()" variant="danger">Rechazar</b-button>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="d-flex justify-content-center"
                        v-if="form.estatus_id == 3 && usuario.tipos_id == 1 && usuario.gefe_carrera == 0">

                        <b-row>
                            <b-col>
                                <b-button @click="form.veredicto = 'Aceptado';aceptadoParaFinalizar()" variant="success">Aceptar</b-button>
                            </b-col>
                            <b-col>
                                <b-button @click="form.veredicto = 'Rechazado';rechazadoParaComite()" variant="danger">Rechazar</b-button>
                            </b-col>
                        </b-row>
                    </div>

                </div>
                <div class="col-md-6 d-flex justify-content-center"> <b-row>
                        <div v-for="item in solicitudes">
                            <b-col class="text-center m-3">
                                <b-card @click="cambiarSolicitud(item)" class="small-card shadow card-solicitud "
                                    title="Solicitud">
                                    <label for=""><strong>Descripcion</strong></label>
                                    <p>{{ item.solicitud_descripcion }}</p>
                                    <p for=""><strong>Fecha:</strong></p> <span>{{
                                        formatearFecha(item.solicitudes_createdAt)
                                    }}</span>
                                    <p><strong>status:</strong></p> <span>{{ item.descripcion_estatus }}</span>
                                </b-card>
                            </b-col>
                        </div>
                    </b-row>
                </div>
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
                fecha_inicio: '',
                fecha_fin: '',
                url: '',
                nombre: '',
                solicitud_descripcion: '',
                solicitud_id: '',
                estatus_id: '',
                solicitudes_usuarios_id: '',
                descripcion_estatus: '',
                solicitudes_createdAt: '',
                veredicto: '',

            },
            solicitudes: [],
            comentario_comite: null,
            selectedFiles: [],
            contadorArchivos: 1,
            selectedOptionCarrera: null,
            selectedOptionTipos: null,


        }
    },
    props: {
        modalVisibleInfo: {
            type: Boolean,

        },
        showModalInfo: {
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

        },
        usuario: {
            type: Object,

        },
    },
    methods: {
        aceptadoParaAdministracion() {
            if (this.form.estatus_id == 2 && this.usuario.tipos_id == 2 && this.usuario.gefe_carrera == 0) {

                if (this.comentario_comite == null) {
                    this.$toast.error('Ingrese un comentario');
                    return;
                }
            }
            this.form.comentario_comite = this.comentario_comite;
            this.$axios.post('/solicitudes/aceptadoAdministracion', this.form).then((response) => {
                console.log(response.data)
                if (response.data.status == 400) {
                    this.$toast.error('Error al actualizar');
                } else {
                    this.$toast.success('Solicitud aceptada');
                    this.get()
                    this.closeModal()
                }

            })
        },
        aceptadoParaComite() {

            console.log(this.form, 'form');
            this.$axios.post('/solicitudes/aceptadoComite', this.form).then((response) => {
                console.log(response.data)
                if (response.data.status == 400) {
                    this.$toast.error('Error al actualizar');
                } else {
                    this.$toast.success('Solicitud aceptada');
                    this.get()
                    this.closeModal()
                    this.$router.push({ path: this.$route.path })
                }

            })
        },
        aceptadoParaFinalizar() {
            let correo = {
                subject: 'Comite Academico',
                text: 'El proceso de su solicitud a finalizado comuniquese con el jefe de carrera con su documentacion',
            }
            this.form.correo = correo;
            this.form.estado = 1;
            
            this.$axios.post('/solicitudes/aceptadoFinalizar', this.form).then((response) => {
                console.log(response.data)
                if (response.data.status == 400) {
                    this.$toast.error('Error al actualizar');
                } else {
                    this.$toast.success('Solicitud aceptada');
                    this.get()
                    this.closeModal()
                    this.$router.push({ path: this.$route.path })
                }

            })
        },
        rechazadoParaComite() {
            let correo = {
                subject: 'Comite Academico',
                text: 'Tu solicitud a sido rechazada comuniquese con el jefe de carrera',
            }
            this.form.correo = correo;
            this.form.estado = 0;
            this.$axios.post('/sendCorreo', this.form).then((response) => {
                console.log(response.data)
                if (response.data.status == 400) {
                    this.$toast.error('Error al actualizar');
                } else {
                    this.$toast.success('Solicitud rechazada');
                    this.get()
                    this.closeModal()
                    this.$router.push({ path: this.$route.path })
                }

            })
        },
        addFile() {
            if (this.contadorArchivos >= 3) {
                this.$toast.error('Solo se pueden agregar 3 archivos');
            } else {

                this.contadorArchivos++;
            }
        },
        handleFileChange(event) {
            this.selectedFiles = Array.from(event.target.files);
        },
        closeModal() {
            this.showModalInfo(false)

        },
        enviarDocuementos() {
            const formData = new FormData();
            this.selectedFiles.forEach((file) => {
                if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {

                    formData.append('documento', file);
                    this.$axios.post('/servidorDocumentos', formData).then((response) => {
                        console.log(response.data)
                        if (response.data.status == 200) {
                            this.envioUrl(response.data.data);
                        } else {
                            this.$toast.error('Error al subir archivos');
                        }

                    })
                } else {
                    this.$toast.error('Solo se permiten archivos PDF');
                }
            });

        },
        descargarArchivo(docuemento) {
            this.$axios.get('/servidorDocumentos/' + docuemento.url, {
                responseType: 'blob'
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', docuemento.nombre);
                document.body.appendChild(link);
                link.click();
            })
        },
        cambiarSolicitud(card) {
            this.form = card
        },
        formatearFecha() {
            const fechaUTC = new Date();
            const dia = fechaUTC.getUTCDate();
            const mes = fechaUTC.getUTCMonth() + 1; // Los meses en JavaScript se cuentan desde 0, por lo que se suma 1
            const anio = fechaUTC.getUTCFullYear();
            const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
            return fechaFormateada;
        },
        envioUrl(data) {
            this.form.fecha_inicio = this.formatearFecha();
            this.form.fecha_fin = this.formatearFecha();
            this.form.url = data.url;
            this.form.nombre = data.nombre;
            this.$axios.post('/solicitudes', this.form).then((response) => {
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


            this.errors.selectedFiles = this.selectedFiles.length > 0 ? '' : 'El campo archivo es requerido';

            // console.log(this.errors, 'errors');
        },
        getUpdate() {
            if (this.create == false) {
                this.cleanForm()
                this.$axios.get('/Solicitudes/' + this.rowSelected.solicitudes_usuarios_id).then((response) => {
                    console.log(response, 'update');
                    this.solicitudes = response.data.data;
                    console.log(this.solicitudes, 'solicitudes');
                    console.log(this.rowSelected, 'rowSelected');
                    let index = this.solicitudes.findIndex((elemento) => elemento.id === this.rowSelected.id);
                    console.log(index, 'solicitudes');
                    this.form = this.solicitudes[index];
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

.card-solicitud {
    max-width: 300px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: box-shadow 0.3s ease;
}

.card-solicitud:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    cursor: pointer;
    color: rgb(33, 33, 204);
}

.documentos:hover {
    cursor: pointer;
    color: rgb(33, 33, 204);
}

.columns {
    min-width: 300px;
    padding-bottom: 0;
}
</style>