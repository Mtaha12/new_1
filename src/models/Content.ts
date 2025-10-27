import mongoose, { Schema, Document } from 'mongoose';

export interface IContentTranslation {
  title: string;
  description: string;
  content: string;
}

export interface IContent extends Document {
  slug: string;
  en: IContentTranslation;
  ar: IContentTranslation;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContentTranslationSchema = new Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  content: { 
    type: String, 
    required: [true, 'Content is required'],
    trim: true
  }
}, { _id: false });

const ContentSchema = new Schema({
  slug: { 
    type: String, 
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain letters, numbers, and hyphens']
  },
  en: ContentTranslationSchema,
  ar: ContentTranslationSchema,
  category: { 
    type: String, 
    required: [true, 'Category is required'],
    enum: ['blog', 'service', 'page', 'faq'],
    default: 'page'
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

// Index for better query performance (slug already has unique: true, so no need for separate index)
ContentSchema.index({ category: 1 });
ContentSchema.index({ 'en.title': 'text', 'ar.title': 'text' });

export default mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);