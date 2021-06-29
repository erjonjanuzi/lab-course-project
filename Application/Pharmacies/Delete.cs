using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Pharmacies
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var pharmacy = await context.Pharmacies.FindAsync(request.Id);

                context.Remove(pharmacy);

                var result = await context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failed to delete the product");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}