using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using nabe.order.management.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace nabe.order.management.DAL
{
    internal static class NabeDbContextExtensions
    {
        public static void EnsureSeedData(this NabeDbContext ctx)
        {
            if (ctx.AllMigrationsApplied())
            {
                if (!ctx.Companies.Any() && !ctx.Customers.Any() && !ctx.Orders.Any())
                {
                    var eyeLevel = new Company
                    {
                        Name = "EYELEVEL s.r.o.",
                        Address = new Address
                        {
                            Street = "NUPAKY",
                            StreetNumber = 148,
                            Municipality = "RICANY",
                            State = "Czech Republic",
                            ZipCode = 25101,
                        },
                        ICO = 25716433,
                        DIC = "CZ699003075"
                    };

                    ctx.Companies.Add(eyeLevel);

                    Customer baldik, bestak, bures;

                    ctx.Customers.Add(baldik = new Customer { Name = "Baldík", Company = eyeLevel }); ;
                    ctx.Customers.Add(bestak = new Customer { Name = "Bešťák", Company = eyeLevel }); ;
                    ctx.Customers.Add(bures = new Customer { Name = "Bureš", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Fíla", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Halčař", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Hanzal", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Holenka", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Hriš", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Jager", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Jakubek", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Ježek", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Jindra", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Jordan", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Král", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Klika", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Klíma", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Kohout", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Koudelák", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Novák", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Novotný", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Marek", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Matoušek", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Maulis", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Olšavský", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "OPTIMOVISTA", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Piják", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Piknová", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Poláčková", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Polok", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Pospíšilová", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Protiva", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Procházka", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Sedlák", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Šnýdl", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Švárová", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Šilberská", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Vinař", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Vokatý", Company = eyeLevel }); ;
                    ctx.Customers.Add(new Customer { Name = "Voráček", Company = eyeLevel }); ;

                    ExternalDelivery ed = null;

                    ctx.Orders.Add(new Order
                    {
                        Code = 20021925,
                        Customer = baldik,
                        Date = DateTime.Now,
                        Description = "strecher, top rail 700, 710",
                        DeliveryDate = DateTime.Now.Add(TimeSpan.FromDays(30)),
                        Invoice = new Invoice()
                        {
                            Code = 970655,
                            ExpeditionDate = DateTime.Now.Add(TimeSpan.FromDays(26)),
                            BillsOfDelivery = new List<BillOfDelivery>()
                                {
                                    new BillOfDelivery { Code = "20170810" },
                                    new BillOfDelivery { Code = "20171001" }
                                },
                        },
                        LaserProgram = LaserProgram.Partly,
                        SentForManufacturing = false,
                        ExternalDeliveries = new List<ExternalDelivery>()
                        {
                            {
                                ed = new ExternalDelivery
                                {
                                    Comments = "prý to nejde",
                                    Customers = new List<ExternalDeliveryCustomer>() {
                                            new ExternalDeliveryCustomer
                                            {
                                                Customer = baldik,
                                                ExternalDelivery = ed
                                            },
                                            new ExternalDeliveryCustomer
                                            {
                                                Customer = bestak,
                                                ExternalDelivery = ed
                                            },
                                        },
                                    Description = "je třeba ohnout trubku",
                                    State = State.NotReady
                                }
                            }
                        },
                    });
                }
            }
        }

        public static void InitializeDb(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var ctx = serviceScope.ServiceProvider.GetService<NabeDbContext>();

                ctx.Database.EnsureDeleted();
                ctx.Database.EnsureCreated();

                ctx.Database.Migrate();
                ctx.SaveChanges();

                ctx.EnsureSeedData();
                ctx.SaveChanges();
            }
        }
    }
}
