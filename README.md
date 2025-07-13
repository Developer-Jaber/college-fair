# College Booking Portal

![Project Banner]("https://i.ibb.co/LDCdVT6d/Screenshot-2025-07-13-151313.png")  
*A modern platform for booking college facilities and managing admissions*

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Features ✨

### College Management
- Browse and search colleges
- View facility availability
- Detailed college profiles

### Booking System
```typescript
// Example booking API route
export async function POST(request: Request) {
  const { userId, facilityId, date } = await request.json();
  
  const booking = await db.bookings.create({
    data: {
      user: { connect: { id: userId } },
      facility: { connect: { id: facilityId } },
      date: new Date(date),
      status: 'CONFIRMED'
    }
  });
  
  return NextResponse.json(booking);
}