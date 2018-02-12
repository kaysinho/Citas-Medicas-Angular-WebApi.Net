using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;


namespace WebAPI.Controllers
{
    public class specialty_field
    {
        public int id { get; set; }
        public string url { get; set; }
        public string specialty_type { get; set; }
    }

    public class Doctor
    {
        public int id { get; set; }
        public string url { get; set; }
        public string identification { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string blood_type { get; set; }
        public specialty_field specialty_field { get; set; }
    }

    public class DoctoresController : ApiController
    {
        // GET: api/Doctores
        [ResponseType(typeof(Doctor))]
        public Newtonsoft.Json.Linq.JArray Get()
        {

            WebClient wc = new WebClient();
            var json = wc.DownloadString("http://pruebas.apimedic.personalsoft.net:8082/api/v1/doctors");
            dynamic dynObj = JsonConvert.DeserializeObject(json);
            return dynObj;
        }

    }
}
