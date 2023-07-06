<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <!-- <h1 class="text-white">Create an account</h1>
              <p class="text-lead text-white">Use these awesome forms to login or create new account in your project for
                free.</p> -->
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8" >
          <b-card no-body class="bg-secondary border-0">
            <!-- <b-card-header class="bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-4"><small>Sign up with</small></div>
              <div class="text-center">
                <a href="#" class="btn btn-neutral btn-icon mr-4">
                  <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                  <span class="btn-inner--text">Github</span>
                </a>
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                  <span class="btn-inner--text">Google</span>
                </a>
              </div>
            </b-card-header> -->
            <b-card-body class="px-lg-5 py-lg-5">
              <!-- <div class="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div> -->
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-hat-3"
                              placeholder="Nombre"
                              name="nombre"
                              :rules="{required: true}"
                              v-model="model.nombre">
                  </base-input>
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-hat-3"
                              placeholder="Apellido Paterno"
                              name="apellido paterno"
                              :rules="{required: true}"
                              v-model="model.apellido_p">
                  </base-input>
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-hat-3"
                              placeholder="Apellido Materno"
                              name="apellido materno"
                              v-model="model.apellido_m">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-email-83"
                              placeholder="Correo Escolar"
                              name="Email"
                              :rules="{required: true, email: true}"
                              autocomplete="new-email"
                              v-model="model.correo_escolar">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-email-83"
                              placeholder="Correo Personal"
                              name="correo"
                              :rules="{required: true, email: true}"
                              autocomplete="new-email"
                              v-model="model.correo_personal">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-email-83"
                              type="number"
                              placeholder="Telefono"
                              name="telefono"
                              :rules="{required: true}"
                              v-model="model.telefono">
                  </base-input>
                  <base-input>
                  <label for="">Carrera</label>
                  <b-select class="" v-model="model.carreras_id">
                            <option v-for="option in carreras" :value="option.id" :key="option.id">{{ option.descripcion }}
                            </option>
                        </b-select>
                  </base-input>
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="Contraseña"
                              type="password"
                              name="Contraseña"
                              :rules="{required: true, min: 6}"
                              autocomplete="new-password"
                              v-model="model.contrasena">
                  </base-input>
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="Repetir Contraseña"
                              type="password"
                              name="Contraseña Repetida"
                              autocomplete="new-password"
                              v-model="model.contrasenaRepetida">
                  </base-input>
                  <!-- <div class="text-muted font-italic"><small>Seguridad de contraseña: <span
                    class="text-success font-weight-700">strong</span></small></div> -->
                  <b-row class=" my-4">
                    <b-col cols="12">
                      <!-- <base-input :rules="{ required: { allowFalse: false } }" name=Privacy Policy>
                        <b-form-checkbox v-model="model.agree">
                          <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                        </b-form-checkbox>
                      </base-input> -->
                    </b-col>
                  </b-row>
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4">Crear cuenta</b-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

  export default {
    name: 'register',
    data() {
      return {
        model: {
          nombre:'',
          apellido_p:'',
          apellido_m:'',
          carreras_id:null,
          telefono:'',
          correo_escolar:'',
          correo_personal:'',
          contrasena:'',
          contrasenaRepetida:'',
          
        },
        carreras:[],
      }
    },
    methods: {
      onSubmit() {
        if (this.model.contrasena != this.model.contrasenaRepetida || this.model.contrasena == '' || this.model.contrasenaRepetida == '') {
          this.$toast.error('Las contraseñas no coinciden', 'Error');
          return;
        }
        this.$axios.post('/auth/register/NewUsuarios', this.model).then((response) => {
                console.log(response.data, 'response')
                if (response.data.data.status == 400) {
                    this.$toast.error(response.data.data.message);
                } else {
                    this.$toast.success(response.data.data.message);
                    this.$router.push('/login');
                }

            })
        // this will be called only after form is valid. You can do an api call here to register users
      }
    },
    mounted() {
      // this.$refs.formValidator.validate();
      this.$axios.get('/carreras/registro').then((response) => {
                // console.log(response.data, 'carreras')
                this.carreras = response.data.data
                console.log(this.carreras, 'carreras');
            }).catch((error) => {
                error.response.status == 401 ?  this.$router.push('/page-401') :
                console.log(error, 'error')
            })
    }

  };
</script>
<style></style>
