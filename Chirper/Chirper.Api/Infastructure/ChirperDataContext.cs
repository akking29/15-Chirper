using Chirper.Api.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Chirper.Api.Infastructure
{
    public class ChirperDataContext : IdentityDbContext<ChirperUser>
    {
        public ChirperDataContext() : base("Chirper")
        {

        }

        public IDbSet<Post> Posts { get; set; }
        public IDbSet<Comment>Comments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //configures the 1-many relationship between post and comment
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Comments)
                .WithRequired(c => c.Post)
                .HasForeignKey(c => c.PostId);

            //configures a 1-many relationship between user and post
            modelBuilder.Entity<ChirperUser>()
                .HasMany(u => u.Posts)
                .WithRequired(p => p.User)
                .HasForeignKey(p => p.UserId);

            //configures a 1-many relationship between user and comment
            modelBuilder.Entity<ChirperUser>()
                .HasMany(u => u.Comments)
                .WithRequired(c => c.User)
                .HasForeignKey(c => c.UserId)
                .WillCascadeOnDelete(false);
                

            base.OnModelCreating(modelBuilder);

        }

    }
}