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
    public class Especialidad
    {
        public string url { get; set; }
        public int id { get; set; }
        public string specialty_type { get; set; }
    }
    public class EspecialidadesController : ApiController
    {
        // GET: api/Especialidades
        [ResponseType(typeof(Especialidad))]
        public Newtonsoft.Json.Linq.JArray Get()
        {
            WebClient wc = new WebClient();
            var json = wc.DownloadString("http://pruebas.apimedic.personalsoft.net:8082/api/v1/specialties/");
            dynamic dynObj = JsonConvert.DeserializeObject(json);
            return dynObj;
        }

    }
}
