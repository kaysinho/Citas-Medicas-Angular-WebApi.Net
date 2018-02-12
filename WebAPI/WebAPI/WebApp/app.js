var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http, $timeout) {
    $scope.horarios = ["06:00:00", "06:15:00", "06:30:00",
        "06:45:00", "07:00:00", "07:15:00", "07:30:00", "07:45:00", "08:00:00", "08:15:00", "08:30:00", "08:45:00",
        "09:00:00", "09:15:00", "09:30:00", "09:45:00", "10:00:00", "10:15:00",
        "10:30:00", "10:45:00", "11:00:00", "11:15:00", "11:30:00", "11:45:00",
        "12:00:00", "12:15:00", "12:30:00", "12:45:00", "13:00:00", "13:15:00", "13:30:00", "13:45:00",
        "14:00:00", "14:15:00", "14:30:00", "14:45:00", "15:00:00", "15:15:00", "15:30:00", "15:45:00",
        "16:00:00", "16:15:00", "16:30:00", "16:45:00", "17:00:00", "17:15:00", "17:30:00", "17:45:00", "18:00:00"]
    $scope.estadoForm = "Nuevo";
    $scope.data = {
        endpoints: {
            especialidades: "http://localhost:28750/api/Especialidades/",
            doctores: "http://localhost:28750/api/Doctores/",
            pacientes: "http://localhost:28750/api/Pacientes/",
            citas: "http://localhost:28750/api/tblCitas/"
        },
        especialidades: [],
        doctores: [],
        doctoresPorEspecialidad: [],
        pacientes: [],
        horarios: $scope.horarios,
        citas: []
    };
    $scope.cita = {
        especialidad: {
            id: '', specialty_type: '', url: ''
        },
        doctor: '',
        paciente: {
            id: '',
            documento: '',
            nombre: '',
            apellidos: ''
        },
        fecha: '',
        hora: '',
        horaFin: ''
    }
    $scope.mensajes = {
        exitoso: '',
        error: '',
        validacion:''
    }
    //Mensajes de error
    $scope.mostrarError = function (mensaje) {
        $scope.mensajes.error = mensaje;
        $('#modalErrores').modal('open');
        return;
    }

    //Mensajes exitosos
    $scope.exitoso = function (mensaje) {
        $scope.mensajes.exitoso = mensaje;
        $('#modalMensajes').modal('open');
        return;
    }

        //Mensajes de Validacion
        $scope.validacionMensaje = function (mensaje) {
            $scope.mensajes.validacion = mensaje;
            $('#modalValidaciones').modal('open');
            return;
        }

    //Obtener las Citas
    $scope.getCitas = function () {
        $http.get($scope.data.endpoints.citas)
            .then(function (data, status, headers, config) {
                $scope.data.citas = data.data;
            }, function (data, status, headers, config) {
                $scope.mostrarError("Error al obtener las citas");
            });
    };

    //Obtener las Especialidades
    $scope.getEspecislitas = function () {
        $http.get($scope.data.endpoints.especialidades)
            .then(function (data, status, headers, config) {
                $scope.data.especialidades = data.data;
            }, function (data, status, headers, config) {
                $scope.mostrarError("Error al obtener las especialidades");
            });
    };

    //Obtener los Doctores
    $scope.getDoctores = function () {
        $http.get($scope.data.endpoints.doctores)
            .then(function (data, status, headers, config) {
                $scope.data.doctores = data.data;
            }, function (data, status, headers, config) {
                $scope.mostrarError("Error al obtener los doctores");
            });
    };

    //Filtrar Doctores
    $scope.filtrarDoctores = function () {
        $scope.data.doctoresPorEspecialidad = [];
        for (var i = 0; i < $scope.data.doctores.length; i++) {
            if ($scope.data.doctores[i].specialty_field.id == $scope.cita.especialidad.id) {
                $scope.data.doctoresPorEspecialidad.push($scope.data.doctores[i]);
            }
        }
        $timeout(function () {
            $('select').material_select();
        }, 200);
    }

    //Retornar el nombre del Doctor
    $scope.getDoctorName = function (id) {
        for (var i = 0; i < $scope.data.doctores.length; i++) {
            if ($scope.data.doctores[i].id == id) {
                return $scope.data.doctores[i].first_name + ' ' + $scope.data.doctores[i].last_name;
            }
        }
    }

    //Retornar el nombre del Doctor
    $scope.getEspecialidadDoctor = function (id) {
        for (var i = 0; i < $scope.data.doctores.length; i++) {
            if ($scope.data.doctores[i].id == id) {
                return $scope.data.doctores[i].specialty_field.id;
            }
        }
    }

    //Retornar el nombre del Paciente
    $scope.getPatientName = function (id) {
        for (var i = 0; i < $scope.data.pacientes.length; i++) {
            if ($scope.data.pacientes[i].identification == id) {
                return $scope.data.pacientes[i].first_name + ' ' + $scope.data.pacientes[i].last_name;
            }
        }
    }

    //Retornar el estado de la cita
    $scope.getEstadoCita = function (estado) {
        if (estado) {
            return "Activa";
        } else {
            return "Cancelada";
        }
    }

    //Obtener los Pacientes
    $scope.getPacientes = function () {
        $http.get($scope.data.endpoints.pacientes)
            .then(function (data, status, headers, config) {
                $scope.data.pacientes = data.data;
            }, function (data, status, headers, config) {
                $scope.mostrarError("Error al obtener los pacientes");
            });
    };

    //Seleccionar Cita
    $scope.seleccionarCita = function (id, cancelarCita) {
        for (var i = 0; i < $scope.data.citas.length; i++) {
            if ($scope.data.citas[i].id == id) {
                $scope.cita.id = id;
                $scope.seleccionarPacienteIdentificacion($scope.data.citas[i].idPaciente);
                $scope.seleccionarEspecialidad($scope.getEspecialidadDoctor($scope.data.citas[i].idMedico), $scope.data.citas[i].idMedico);
                $scope.cita.fecha = $scope.data.citas[i].fecha.substr(0, 10);
                $scope.seleccionarHoraInicio($scope.data.citas[i].horaInicio);
                $scope.cita.horaFin = $scope.data.citas[i].horaFin;
                if (!cancelarCita){
                    $timeout(function () {
                        $('select').material_select(); $('ul.tabs').tabs('select_tab', 'citas');
                    }, 200);
                    $scope.estadoForm = "Actualizar";
                }
                
            }
        }
    }

    //Seleccionar Hora Inicio
    $scope.seleccionarHoraInicio = function (hora) {
        for (var i = 0; i < $scope.data.horarios.length; i++) {
            if ($scope.data.horarios[i] == hora) {
                $scope.cita.hora = $scope.data.horarios[i];
                $timeout(function () {
                    $('select').material_select();
                }, 200);
            }
        }
    }

    //Seleccionar Doctor
    $scope.seleccionarDoctor = function (id) {
        for (var i = 0; i < $scope.data.doctores.length; i++) {
            if ($scope.data.doctores[i].id == id) {
                $scope.cita.doctor = $scope.data.doctores[i];
                $timeout(function () {
                    $('select').material_select();
                }, 100);
            }
        }
    }

    //Seleccionar Paciente en el Modal
    $scope.seleccionarPaciente = function (id) {
        for (var i = 0; i < $scope.data.pacientes.length; i++) {
            if ($scope.data.pacientes[i].id == id) {
                $scope.cita.paciente.id = $scope.data.pacientes[i].id;
                $scope.cita.paciente.documento = $scope.data.pacientes[i].identification;
                $scope.cita.paciente.nombre = $scope.data.pacientes[i].first_name;
                $scope.cita.paciente.apellidos = $scope.data.pacientes[i].last_name;
            }
        }
        $('#modal1').modal('close');

        $timeout(function () {
            Materialize.updateTextFields();
        }, 200);
    }

    //Seleccionar Paciente
    $scope.seleccionarPacienteIdentificacion = function (id) {
        for (var i = 0; i < $scope.data.pacientes.length; i++) {
            if ($scope.data.pacientes[i].identification == id) {
                $scope.cita.paciente.id = $scope.data.pacientes[i].id;
                $scope.cita.paciente.documento = $scope.data.pacientes[i].identification;
                $scope.cita.paciente.nombre = $scope.data.pacientes[i].first_name;
                $scope.cita.paciente.apellidos = $scope.data.pacientes[i].last_name;
            }
        }
        $('#modal1').modal('close');

        $timeout(function () {
            Materialize.updateTextFields();
        }, 200);
    }

    //Seleccionar Especialidad
    $scope.seleccionarEspecialidad = function (id, idMedico) {
        for (var i = 0; i < $scope.data.especialidades.length; i++) {
            if ($scope.data.especialidades[i].id == id) {
                $scope.cita.especialidad = $scope.data.especialidades[i];
                $scope.filtrarDoctores()
                $timeout(function () {
                    $scope.seleccionarDoctor(idMedico);
                }, 100);

            }
        }
        $('#modal1').modal('close');

        $timeout(function () {
            Materialize.updateTextFields();
        }, 200);
    }

    //Limpiar paciente al cancelar la modal o cerrarla por error
    $scope.limpiarPacienteCita = function () {
        $scope.cita.paciente.id = "";
        $scope.cita.paciente.documento = "";
        $scope.cita.paciente.nombre = "";
        $scope.cita.paciente.apellidos = "";
        $timeout(function () {
            Materialize.updateTextFields();
        }, 200);
    }

    //Seleccionar la Hora final de la cita
    $scope.seleccionarHoraFinal = function () {
        for (var i = 0; i < $scope.data.horarios.length; i++) {
            if ($scope.data.horarios[i] == $scope.cita.hora) {
                $scope.cita.horaFin = $scope.data.horarios[i + 1];
                $timeout(function () {
                    Materialize.updateTextFields();
                }, 100);
                break;
            }
        }
    }

    //Metodo de Post y Put
    $scope.GuardarCita = function () {
        if ($scope.estadoForm == "Nuevo") {
            $scope.crearCita();
        } else {
            $scope.editarCita();
        }
    }

    //Actualizar Cita
    $scope.editarCita = function () {
        var tblCitas = {
            id: $scope.cita.id,
            idPaciente: $scope.cita.paciente.documento,
            idMedico: $scope.cita.doctor.id,
            fecha: $scope.cita.fecha + ' 0:00:00.000',
            estado: 1,
            horaInicio: $scope.cita.hora,
            horaFin: $scope.cita.horaFin,
        };

        $http.put(
            $scope.data.endpoints.citas + $scope.cita.id,
            JSON.stringify(tblCitas)
        ).then(function (data, status, headers, config) {
            $scope.exitoso("Se ha actualizado la cita, consulte el calendario");
            $scope.getCitas();
            $scope.estadoForm = "Nuevo";
        }, function (data, status, headers, config) {
            $scope.mostrarError("Error al guardar la cita");
        });
    }

    //Actualizar Cita
    $scope.cancelarCita = function (id) {
        $scope.seleccionarCita(id, true);
        
        $timeout(function () {
            var tblCitas = {
                id: $scope.cita.id,
                idPaciente: $scope.cita.paciente.documento,
                idMedico: $scope.cita.doctor.id,
                fecha: $scope.cita.fecha + ' 0:00:00.000',
                estado: 0,
                horaInicio: $scope.cita.hora,
                horaFin: $scope.cita.horaFin,
            };
            $http.put(
                $scope.data.endpoints.citas + $scope.cita.id,
                JSON.stringify(tblCitas)
            ).then(function (data, status, headers, config) {
                $scope.exitoso("Se ha cancelado la cita, consulte el calendario");
                $scope.getCitas();
                $scope.estadoForm = "Nuevo";
                $scope.limpiarFormulario();
            }, function (data, status, headers, config) {
                $scope.mostrarError("Error al cancelar la cita");
            });
        }, 100);
        
    }

    //Actualizar Cita
    $scope.eliminarCita = function (id) {
        var dataSend = {
            id: id
        };

        $http.delete(
            $scope.data.endpoints.citas + id,
            JSON.stringify(dataSend)
        ).then(function (data, status, headers, config) {
            $scope.exitoso("Se ha eliminado la cita");
            $scope.getCitas();
            $scope.estadoForm = "Nuevo";
        }, function (data, status, headers, config) {
            $scope.mostrarError("Error al eliminar la cita");
        });
    }


    //GuardarCitaNueva
    $scope.crearCita = function () {
        if ($scope.validarFormulario()){
            var tblCitas = {
                id: 0,
                idPaciente: $scope.cita.paciente.documento,
                idMedico: $scope.cita.doctor.id,
                fecha: $scope.cita.fecha + ' 0:00:00.000',
                estado: 1,
                horaInicio: $scope.cita.hora,
                horaFin: $scope.cita.horaFin,
            }
            $http.post(
                $scope.data.endpoints.citas,
                JSON.stringify(tblCitas)
            ).then(function (data, status, headers, config) {
                $scope.exitoso("Se ha creado la cita, consulte el calendario");
                $scope.getCitas();
                $scope.estadoForm = "Nuevo";
            }, function (data, status, headers, config) {
                $scope.mostrarError("Error al guardar la cita");
            });
        }
        
    }

    $scope.validarFormulario = function(){
        if ($scope.cita.paciente.id.length==0){
            $scope.validacionMensaje("Debe seleccionar un paciente");
            return false;
        }
        if ($scope.cita.especialidad.id.length==0){
            $scope.validacionMensaje("Debe seleccionar una especialidad");
            return false;
        }
        if ($scope.cita.doctor.length==0){
            $scope.validacionMensaje("Debe seleccionar un doctor");
            return false;
        }
        if ($scope.cita.fecha.length==0){
            $scope.validacionMensaje("Debe seleccionar una fecha");
            return false;
        }
        if ($scope.cita.hora.length==0){
            $scope.validacionMensaje("Debe seleccionar un hora");
            return false;
        }
        if ($scope.disponibilidadPorMedico()){
            $scope.validacionMensaje("El doctor "+ $scope.cita.doctor.first_name + " ya tiene una cita asignada en la fecha " + $scope.cita.fecha + " a las " + $scope.cita.hora+". Por favor escoja otro horario");
            return false;
        }
        return true;
    }

    $scope.disponibilidadPorMedico = function(){
        for (var i=0; i<$scope.data.citas.length; i++){
            if ($scope.data.citas[i].idMedico==$scope.cita.doctor.id &&
                $scope.data.citas[i].fecha.substr(0, 10)==$scope.cita.fecha &&
                $scope.data.citas[i].hora==$scope.cita.horaInicio &&
                $scope.data.citas[i].estado == true
            ){
                return true;
            }
        }
        return false;
    }

    $scope.limpiarFormulario = function(){
        $scope.cita = {
            especialidad: {
                id: '', specialty_type: '', url: ''
            },
            doctor: '',
            paciente: {
                id: '',
                documento: '',
                nombre: '',
                apellidos: ''
            },
            fecha: '',
            hora: '',
            horaFin: ''
        }
        $scope.estadoForm = "Nuevo";
        $timeout(function () {
            $('select').material_select();
        }, 100);
    }
    

    $timeout(function () {
        $('select').material_select();
    }, 1000);
    $timeout(function () {
        $('select').material_select();
    }, 2000);
    $timeout(function () {
        $('select').material_select();
    }, 3000);
    $timeout(function () {
        $('select').material_select();
    }, 4000);


    //Llamados iniciales
    $scope.getEspecislitas();
    $scope.getDoctores();
    $scope.getPacientes();
    $scope.getCitas();
}); 