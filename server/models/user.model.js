const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    // Basic user information
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
        trim: true,
        // Prevent names that are too long or contain harmful characters
        maxLength: [50, 'Name cannot be more than 50 characters'],
        validate: {
            validator: function(v) {
                // Only allow letters, spaces, and common special characters
                return /^[a-zA-Z\s\-']+$/.test(v);
            },
            message: 'Name can only contain letters, spaces, hyphens, and apostrophes'
        }
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [8, 'Password must be at least 8 characters'],
        // Don't send password in normal queries
        select: false,
        validate: {
            validator: function(v) {
                // Require strong passwords with mixed case, numbers, and special chars
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    // Security fields
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    // Account lockout for too many failed attempts
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date
    }
}, {
    // Add timestamps to track creation and updates
    timestamps: true
});

// Hide sensitive data from responses
userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    delete obj.loginAttempts;
    delete obj.lockUntil;
    return obj;
};

// Encrypt password before saving
userSchema.pre('save', async function(next) {
    // Only hash password if it's been modified
    if (!this.isModified('password')) return next();
    
    try {
        // Generate a strong salt and hash
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check if password is correct
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

// Method to handle failed login attempts
userSchema.methods.incLoginAttempts = async function() {
    // Lock account if too many attempts
    if (this.loginAttempts + 1 >= 5) {
        // Lock for 1 hour
        this.lockUntil = Date.now() + 3600000;
    }
    
    this.loginAttempts += 1;
    return await this.save();
};

module.exports = mongoose.model('User', userSchema);