using Angular_WEBAPI.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Angular_WEBAPI.Controllers
{
    [RoutePrefix("api/Client")]
    public class ClientController : ApiController
    {
        MyeCommerceEntities _context = new MyeCommerceEntities();


        //public IHttpActionResult GetEmployeeList(string Term)
        //{
        //    var clientList = from c in _context.EmployeeDetails
        //                     where c.FirstName.Contains(Term)
        //                     select c;
        //    return Ok(clientList);
        //}
        [HttpGet]
        [Route("~/GetEmployeeList")]
        public IHttpActionResult GetEmployeeList()
        {
            //var clientList = from c in _context.EmployeeDetails
            //                 where c.FirstName.Contains(Term)
            //                 select c;
            return Ok(_context.EmployeeDetails.ToList());
        }

        [Route("~/GetEmployeeById")]
        public IHttpActionResult GetEmployeeById(int eId)
        {
            
            if (eId <= 0)
                return BadRequest("Not a valid Employee id");

            using (var ctx = new MyeCommerceEntities())
            {
                 var student = ctx.EmployeeDetails.Where(s => s.id == eId).FirstOrDefault();
                 return Ok(student);
            }

            return Ok();
        }

        [System.Web.Http.HttpDelete]
        [Route("~/DeleteEmployee")]
        public IHttpActionResult DeleteEmployee(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid Employee id");

            using (var ctx = new MyeCommerceEntities())
            {
                var student = ctx.EmployeeDetails.Where(s => s.id == id).FirstOrDefault();

                ctx.Entry(student).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }

            return Ok();
        }

        [AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpPost]
        [Route("~/AddEmployee")]
        public IHttpActionResult AddEmployee([FromBody] EmployeeDetail empdetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.EmployeeDetails.Add(new EmployeeDetail()
            {
                //id = Convert.ToInt32(empdetail["id"]),
                FirstName = empdetail.FirstName.ToString(),
                LastName = empdetail.LastName.ToString(),
                Email = empdetail.Email.ToString(),
                Phone = empdetail.Phone.ToString(),
                Blog = empdetail.Blog.ToString()

            });
            _context.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = Convert.ToInt32(empdetail.id) }, empdetail);
        }

        [System.Web.Http.HttpPut]
        [Route("~/UpdateEmployee")]
        public IHttpActionResult UpdateEmployee(int empId, EmployeeDetail empdetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (empId != empdetail.id)
            {
                return BadRequest();
            }

            _context.Entry(empdetail).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(empId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
            //return Ok();
        }

        private bool CustomerExists(int id)
        {
            return _context.EmployeeDetails.Count(e => e.id == id) > 0;
        }
    }
}
