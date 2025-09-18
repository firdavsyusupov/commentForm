import React, { useState } from 'react';
import { MessageCircle, Edit3 } from 'lucide-react';

interface FormData {
  postTitle: string;
  postContent: string;
  comment: string;
}

interface FormErrors {
  postTitle?: string;
  postContent?: string;
  comment?: string;
}

const PostCommentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    postTitle: '',
    postContent: '',
    comment: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (fieldsToValidate?: (keyof FormData)[]): boolean => {
    const newErrors: FormErrors = {};
    const fields = fieldsToValidate || ['postTitle', 'postContent', 'comment'];

    fields.forEach(field => {
      if (!formData[field].trim()) {
        switch (field) {
          case 'postTitle':
            newErrors.postTitle = 'Post title is required';
            break;
          case 'postContent':
            newErrors.postContent = 'Post content is required';
            break;
          case 'comment':
            newErrors.comment = 'Comment is required';
            break;
        }
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(['postTitle', 'postContent'])) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Creating Post:', {
        title: formData.postTitle,
        content: formData.postContent,
        timestamp: new Date().toISOString()
      });
      
      // Reset post fields
      setFormData(prev => ({
        ...prev,
        postTitle: '',
        postContent: ''
      }));
      
      setIsSubmitting(false);
    }, 500);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(['comment'])) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Adding Comment:', {
        comment: formData.comment,
        timestamp: new Date().toISOString()
      });
      
      // Reset comment field
      setFormData(prev => ({
        ...prev,
        comment: ''
      }));
      
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Create Post & Comments
          </h1>
          <p className="text-gray-600 text-lg">
            Share your thoughts and engage with the community
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Post Creation Section */}
            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Edit3 className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Create Post</h2>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-6">
                <div>
                  <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    id="postTitle"
                    value={formData.postTitle}
                    onChange={(e) => handleInputChange('postTitle', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.postTitle 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
                    }`}
                    placeholder="Enter your post title..."
                    disabled={isSubmitting}
                  />
                  {errors.postTitle && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="w-4 h-4 mr-1">⚠️</span>
                      {errors.postTitle}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="postContent" className="block text-sm font-medium text-gray-700 mb-2">
                    Post Content *
                  </label>
                  <textarea
                    id="postContent"
                    rows={6}
                    value={formData.postContent}
                    onChange={(e) => handleInputChange('postContent', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      errors.postContent 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
                    }`}
                    placeholder="Write your post content here..."
                    disabled={isSubmitting}
                  />
                  {errors.postContent && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="w-4 h-4 mr-1">⚠️</span>
                      {errors.postContent}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Post...
                    </span>
                  ) : (
                    'Create Post'
                  )}
                </button>
              </form>
            </div>

            {/* Comment Section */}
            <div className="p-6 sm:p-8 bg-gray-50">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Add Comment</h2>
              </div>

              <form onSubmit={handleAddComment} className="space-y-6">
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Comment *
                  </label>
                  <textarea
                    id="comment"
                    rows={8}
                    value={formData.comment}
                    onChange={(e) => handleInputChange('comment', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none ${
                      errors.comment 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400 focus:border-green-500 bg-white'
                    }`}
                    placeholder="Share your thoughts, ask questions, or provide feedback..."
                    disabled={isSubmitting}
                  />
                  {errors.comment && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="w-4 h-4 mr-1">⚠️</span>
                      {errors.comment}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Adding Comment...
                    </span>
                  ) : (
                    'Add Comment'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Form data is logged to the browser console for development purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default PostCommentForm;