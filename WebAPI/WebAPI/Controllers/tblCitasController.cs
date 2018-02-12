using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Models;

namespace WebAPI.Controllers
{

    public class tblCitasController : ApiController
    {

        private CitasMedicasEntities db = new CitasMedicasEntities();

        // GET: api/tblCitas
        public IQueryable<tblCitas> GettblCitas()
        {
            return db.tblCitas;
        }

        // GET: api/tblCitas/5
        [ResponseType(typeof(tblCitas))]
        public IHttpActionResult GettblCitas(int id)
        {
            tblCitas tblCitas = db.tblCitas.Find(id);
            if (tblCitas == null)
            {
                return NotFound();
            }

            return Ok(tblCitas);
        }

        // PUT: api/tblCitas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblCitas(int id, tblCitas tblCitas)
        {

            if (id != tblCitas.id)
            {
                return BadRequest();
            }

            db.Entry(tblCitas).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblCitasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/tblCitas
        [ResponseType(typeof(tblCitas))]
        public IHttpActionResult PosttblCitas(tblCitas tblCitas)
        {

            db.tblCitas.Add(tblCitas);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblCitas.id }, tblCitas);
        }

        // DELETE: api/tblCitas/5
        [ResponseType(typeof(tblCitas))]
        public IHttpActionResult DeletetblCitas(int id)
        {
            tblCitas tblCitas = db.tblCitas.Find(id);
            if (tblCitas == null)
            {
                return NotFound();
            }

            db.tblCitas.Remove(tblCitas);
            db.SaveChanges();

            return Ok(tblCitas);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblCitasExists(int id)
        {
            return db.tblCitas.Count(e => e.id == id) > 0;
        }
    }
}