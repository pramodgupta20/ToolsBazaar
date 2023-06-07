namespace ToolsBazaar.Domain.OrderAggregate
{
    public class ValidationResult
    {
        public bool Success { get; set; }
        public List<string> ValidationErrors { get; set; }

        public ValidationResult()
        {
            Success = true;
            ValidationErrors = new List<string>();
        }
    }
}