import { http, HttpResponse } from 'msw';
import { userDatabase, User } from '@/shared/lib/database';

export const handlers = [
  // Get all users (admin only)
  http.get('/api/admin/users', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const userId = parseInt(token.replace('mock-token-', ''));
    const currentUser = userDatabase.getUserById(userId);
    
    if (!currentUser || currentUser.level !== 'admin') {
      return HttpResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const users = userDatabase.getAllUsers().map(user => ({
      serialnumber: user.serialnumber,
      email: user.email,
      name: user.name,
      phone: user.phone,
      level: user.level,
      is_active: user.is_active,
      create_at: user.create_at,
      update_at: user.update_at
    }));

    return HttpResponse.json({
      users
    });
  }),
];