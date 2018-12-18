/* ============
 * Staff Transformer
 * ============
 *
 * The transformer for a staff.
 */

import Transformer from './BaseTransformer'
import Staff from '@/models/Staff'

class StaffTransformer extends Transformer {
  /**
   * Method used to transform a fetched staff.
   *
   * @returns {Staff} A staff model.
   */
  static fetch (staff) {
    return new Staff({
      id: staff.id,
      uuid: staff.uuid,
      fullName: staff.full_name,
      firstName: staff.first_name,
      lastName: staff.last_name,
      email: staff.email,
      phoneNumber: staff.phone_number,
      username: staff.username,
      gender: staff.gender,
      dateOfBirth: staff.date_of_birth,
      address: staff.address,
      startWorkDate: staff.start_work_date,
      payDay: staff.pay_day,
      baseSalary: staff.base_salary,
      avatarUrl: staff.avatar_url,
      status: staff.status,
      resignedAt: staff.resigned_at,
      bonus: staff.bonus,
      emailVerifiedAt: staff.email_verified_at,
      createdAt: staff.created_at,
      updatedAt: staff.updated_at,
      deletedAt: staff.deleted_at,
      bio: staff.bio,
      roles: staff.roles
    })
  }

  /**
   * Method used to transform a send staff.
   *
   * @returns {Object} The transformed staff.
   */
  static send (staff) {
    return {
      id: staff.id,
      first_name: staff.firstName,
      last_name: staff.lastName,
      email: staff.email,
      phone_number: staff.phoneNumber,
      password: staff.password,
      password_confirmation: staff.passwordConfirmation,
      username: staff.username,
      gender: staff.gender,
      date_of_birth: staff.dateOfBirth,
      address: staff.address,
      start_work_date: staff.startWorkDate,
      pay_day: staff.payDay,
      base_salary: staff.baseSalary,
      avatar_url: staff.avatarUrl,
      status: staff.status,
      resigned_at: staff.resignedAt,
      bonus: staff.bonus,
      roles: staff.roles
    }
  }
}

export default StaffTransformer
