using Microsoft.AspNetCore.Mvc;
using ToolsBazaar.Domain.OrderAggregate;

namespace ToolsBazaar.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ILogger<OrderController> _logger;

        public OrderController(ILogger<OrderController> logger, IOrderRepository orderRepository)
        {
            _logger = logger;
            _orderRepository = orderRepository;
        }

        [HttpPost("CreateOrder")]
        public IActionResult CreateOrder([FromBody] CreateOrderRequest request)
        {
            try
            {
                var validationResult = _orderRepository.ValidateOrder(request.ProductId, request.Quantity);
                if (!validationResult.Success)
                {
                    return BadRequest(validationResult.ValidationErrors);
                }

                var order = _orderRepository.CreateOrder(request.ProductId, request.Quantity);

                return Ok(order);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to Create Order for ProductId: {request.ProductId}");
                return StatusCode(500, ex.Message);
            }
        }
    }

    public class CreateOrderRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
