using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest 
        {
            public Activity Activity { get; set; }
        }

        public class handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity activity = await context.Activities.FindAsync(request.Activity.Id);
                mapper.Map(request.Activity, activity);
                await context.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }
}