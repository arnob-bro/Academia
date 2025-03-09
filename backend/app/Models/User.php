<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'userID';
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $fillable = [
        'userID', 'password', 'role'
    ];

    // Student has many enrollments
    // public function enrollments()
    // {
    //     return $this->hasMany(Enrollment::class, 'StudentID');
    // }

    // Student has many payments
    // public function payments()
    // {
    //     return $this->hasMany(Payment::class, 'StudentID');
    // }
}
