using Microsoft.Extensions.Logging;
using ToolsBazaar.Domain.OrderAggregate;
using ToolsBazaar.Domain.ProductAggregate;

namespace ToolsBazaar.Persistence
{
    public class OrderRepository : IOrderRepository
    {
        private readonly IProductRepository _productRepository;
        private readonly ILogger<OrderRepository> _logger;

        public OrderRepository(ILogger<OrderRepository> logger, IProductRepository productRepository)
        {
            _logger = logger;
            _productRepository = productRepository;
        }

        public IEnumerable<Order> GetAll() => DataSet.AllOrders;

        public Order CreateOrder(int productId, int quantity)
        {
            Product? product = _productRepository.GetById(productId) ?? throw new Exception("Product not found");

            Order order = new Order
            {
                Id = 1,
                Customer = new Domain.CustomerAggregate.Customer { Name = "Abc", Id = 1, Email = "abc@xyz.com", Address = "NA" },
                Items = new List<OrderItem>
                {
                    new OrderItem
                    {
                        Id = 1,
                        Product = new Product  {Id=productId,Name=product.Name, Price=product.Price},
                        Quantity = quantity
                    }
                }
            };

            DataSet.AllOrders.Add(order);

            return order;
        }

        public ValidationResult ValidateOrder(int productId, int quantity)
        {
            ValidationResult validationResult = new ValidationResult();

            Product? product = _productRepository.GetById(productId);
            if (product == null)
            {
                validationResult.Success = false;
                validationResult.ValidationErrors.Add("Product not found");
                return validationResult;
            }

            if (quantity <= 0)
            {
                validationResult.Success = false;
                validationResult.ValidationErrors.Add("Invalid quantity");
                return validationResult;
            }

            decimal totalPrice = product.Price * quantity;
            if (totalPrice > 3000)
            {
                _logger.LogWarning("Order total price exceeds $3000");
            }

            return validationResult;
        }
    }
}


