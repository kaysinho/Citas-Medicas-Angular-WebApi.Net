using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebAPI.Controllers
{

    public class Paciente
    {
        public string id { get; set; }
        public string history { get; set; }
        public string identification { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string genre { get; set; }
        public string civil_status { get; set; }
        public string blood_type { get; set; }
        public string date_birth { get; set; }
        public string city_birth { get; set; }
        public string url { get; set; }
    }
    public class PacientesController : ApiController
    {
        // GET: api/Pacientes
        [ResponseType(typeof(Paciente))]
        public Newtonsoft.Json.Linq.JArray Get()
        {
            WebClient wc = new WebClient();
            var json = wc.DownloadString("http://pruebas.apimedic.personalsoft.net:8082/api/v1/patients");
            dynamic dynObj = JsonConvert.DeserializeObject(json);
            return dynObj;
        }

    }
}
