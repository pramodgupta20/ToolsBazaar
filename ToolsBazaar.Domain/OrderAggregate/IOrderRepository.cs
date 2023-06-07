namespace ToolsBazaar.Domain.OrderAggregate;
public interface IOrderRepository
{
    IEnumerable<Order> GetAll();
    Order CreateOrder(int productId, int quantity);
    ValidationResult ValidateOrder(int productId, int quantity);
}