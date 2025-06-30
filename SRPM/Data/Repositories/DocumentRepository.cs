// using Microsoft.EntityFrameworkCore;
// using SRPM.Data.Entities;

// namespace SRPM.Data.Repositories
// {
//     public class DocumentRepository : IDocumentRepository
//     {
//         private readonly ApplicationDbContext _context;

//         public DocumentRepository(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<Document> CreateAsync(Document document)
//         {
//             _context.Documents.Add(document);
//             await _context.SaveChangesAsync();
//             return document;
//         }

//         public async Task<Document?> GetByIdAsync(Guid id)
//         {
//             return await _context.Documents
//                 .Include(d => d.Project)
//                 .FirstOrDefaultAsync(d => d.Id == id && d.IsActive);
//         }

//         public async Task<IEnumerable<Document>> GetByProjectIdAsync(Guid projectId)
//         {
//             return await _context.Documents
//                 .Where(d => d.ProjectId == projectId && d.IsActive)
//                 .OrderByDescending(d => d.UploadedAt)
//                 .ToListAsync();
//         }

//         public async Task<bool> UpdateAsync(Document document)
//         {
//             _context.Documents.Update(document);
//             return await _context.SaveChangesAsync() > 0;
//         }

//         public async Task<bool> DeleteAsync(Guid id)
//         {
//             var doc = await _context.Documents.FindAsync(id);
//             if (doc == null) return false;
//             doc.IsActive = false;
//             return await _context.SaveChangesAsync() > 0;
//         }
//     }
// }
