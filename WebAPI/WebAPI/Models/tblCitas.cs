//------------------------------------------------------------------------------
// <auto-generated>
//    Este código se generó a partir de una plantilla.
//
//    Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//    Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblCitas
    {
        public int id { get; set; }
        public int idPaciente { get; set; }
        public int idMedico { get; set; }
        public System.DateTime fecha { get; set; }
        public bool estado { get; set; }
        public Nullable<System.TimeSpan> horaInicio { get; set; }
        public Nullable<System.TimeSpan> horaFin { get; set; }
    }
}