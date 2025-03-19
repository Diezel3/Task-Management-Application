using System.ComponentModel.DataAnnotations;
namespace TaskManager.Api.Model;
public class Taskk
{
    public int Id { get; set; }
    [Required][StringLength(30, ErrorMessage = "Title cannot exceed 30 characters.")] public required string Title { get; set; }
    [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")] public string? Description { get; set; }
    public bool IsComplete { get; set; } = false;
    public DateTime DueDate { get; set; }
    public string? OwnerId { get; set; }
}